from pathlib import Path

root = Path("upstream-gamelogger")

# Remove Reactor package dependency from the 2024.3.5 project.
csproj = root / "GameLogger" / "GameLogger.csproj"
text = csproj.read_text(encoding="utf-8-sig")
text = text.replace('        <PackageReference Include="Reactor" Version="2.2.0" />\n', '')
csproj.write_text(text, encoding="utf-8")

files = {}

files["GameLogger/GameLoggerPlugin.cs"] = r'''using System.Text;
using BepInEx;
using BepInEx.Unity.IL2CPP;
using HarmonyLib;

namespace GameLogger;

[BepInAutoPlugin("com.whichtwix.gamelogger", "GameLogger", "2.1.1-crewmon")]
[BepInProcess("Among Us.exe")]
public partial class GameLogger : BasePlugin
{
    public Harmony Harmony { get; } = new(Id);
    public static StringBuilder Builder { get; set; } = new();

    public override void Load()
    {
        Harmony.PatchAll();
    }
}
'''

files["GameLogger/Patches/StructuredLog.cs"] = r'''using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace GameLogger
{
    public static class StructuredLog
    {
        public class EventEntry
        {
            public string Timestamp { get; set; } = "";
            public string Type { get; set; } = "";
            public string Player { get; set; } = "";
            public string Target { get; set; } = "";
            public string Detail { get; set; } = "";
            public string System { get; set; } = "";
            public int? Amount { get; set; }
            public string Location { get; set; } = "";
        }

        public class PlayerEntry
        {
            public byte PlayerId { get; set; }
            public string Name { get; set; } = "";
            public string Color { get; set; } = "";
            public string Role { get; set; } = "";
            public bool Dead { get; set; }
            public bool Disconnected { get; set; }
            public int TasksCompleted { get; set; }
            public int TasksTotal { get; set; }
        }

        public class VoteEntry
        {
            public byte VoterId { get; set; }
            public string Voter { get; set; } = "";
            public byte? TargetId { get; set; }
            public string Target { get; set; } = "";
            public string Type { get; set; } = "";
        }

        public class MeetingEntry
        {
            public int Number { get; set; }
            public string StartedAt { get; set; } = "";
            public byte? ReporterId { get; set; }
            public string Reporter { get; set; } = "";
            public byte? ReportedBodyId { get; set; }
            public string ReportedBody { get; set; } = "";
            public bool Emergency { get; set; }
            public string ExileResult { get; set; } = "";
            public List<VoteEntry> Votes { get; set; } = new();
        }

        public class GameEntry
        {
            public int SchemaVersion { get; set; } = 2;
            public string LoggerVersion { get; set; } = "2.1.1-crewmon";
            public string Map { get; set; } = "";
            public string Mode { get; set; } = "";
            public string StartedAt { get; set; } = "";
            public string FinishedAt { get; set; } = "";
            public double DurationSeconds { get; set; }
            public string WinnerReason { get; set; } = "";
            public List<PlayerEntry> Players { get; set; } = new();
            public List<MeetingEntry> Meetings { get; set; } = new();
            public List<EventEntry> Events { get; set; } = new();
        }

        public static GameEntry Current { get; private set; } = new();

        public static void Reset(string map, string mode)
        {
            Current = new GameEntry
            {
                Map = map,
                Mode = mode,
                StartedAt = DateTime.Now.ToString("O")
            };
        }

        public static void Add(
            string type,
            string player = "",
            string target = "",
            string detail = "",
            string system = "",
            int? amount = null,
            string location = "")
        {
            Current.Events.Add(new EventEntry
            {
                Timestamp = DateTime.Now.ToString("O"),
                Type = type,
                Player = player ?? "",
                Target = target ?? "",
                Detail = detail ?? "",
                System = system ?? "",
                Amount = amount,
                Location = location ?? ""
            });
        }

        public static void StartMeeting(
            byte reporterId,
            string reporter,
            byte? reportedBodyId,
            string reportedBody,
            bool emergency)
        {
            Current.Meetings.Add(new MeetingEntry
            {
                Number = Current.Meetings.Count + 1,
                StartedAt = DateTime.Now.ToString("O"),
                ReporterId = reporterId,
                Reporter = reporter ?? "",
                ReportedBodyId = reportedBodyId,
                ReportedBody = reportedBody ?? "",
                Emergency = emergency
            });
        }

        public static void ClearCurrentVotes()
        {
            if (Current.Meetings.Count == 0) return;
            Current.Meetings[Current.Meetings.Count - 1].Votes.Clear();
        }

        public static void AddVote(
            byte voterId,
            string voter,
            byte? targetId,
            string target,
            string type)
        {
            if (Current.Meetings.Count == 0)
            {
                Current.Meetings.Add(new MeetingEntry
                {
                    Number = 1,
                    StartedAt = DateTime.Now.ToString("O")
                });
            }

            var meeting = Current.Meetings[Current.Meetings.Count - 1];
            meeting.Votes.Add(new VoteEntry
            {
                VoterId = voterId,
                Voter = voter ?? "",
                TargetId = targetId,
                Target = target ?? "",
                Type = type ?? ""
            });

            Add(
                "vote",
                player: voter,
                target: target,
                detail: $"meeting={meeting.Number};type={type}");
        }

        public static void SetMeetingExile(string result)
        {
            if (Current.Meetings.Count == 0) return;
            Current.Meetings[Current.Meetings.Count - 1].ExileResult = result ?? "";
        }

        public static void SetWinner(string winnerReason)
        {
            Current.WinnerReason = winnerReason ?? "";
        }

        public static void Finish(double durationSeconds)
        {
            Current.FinishedAt = DateTime.Now.ToString("O");
            Current.DurationSeconds = durationSeconds;
            CapturePlayers();
        }

        private static void CapturePlayers()
        {
            Current.Players.Clear();

            if (PlayerControl.AllPlayerControls == null) return;

            foreach (var player in PlayerControl.AllPlayerControls)
            {
                if (player == null || player.Data == null) continue;

                int completed = 0;
                int total = 0;

                try
                {
                    var data = player.Data;
                    if (!data.Disconnected &&
                        data.Tasks != null &&
                        data.Role != null &&
                        data.Role.TasksCountTowardProgress &&
                        !data.Role.IsImpostor)
                    {
                        total = data.Tasks.Count;
                        for (int i = 0; i < data.Tasks.Count; i++)
                        {
                            if (data.Tasks[i].Complete) completed++;
                        }
                    }
                }
                catch
                {
                    // Keep the rest of the game log even if one player's task list is unavailable.
                }

                Current.Players.Add(new PlayerEntry
                {
                    PlayerId = player.PlayerId,
                    Name = player.Data.PlayerName ?? "",
                    Color = player.Data.ColorName ?? "",
                    Role = player.Data.Role != null ? player.Data.Role.Role.ToString() : "",
                    Dead = player.Data.IsDead,
                    Disconnected = player.Data.Disconnected,
                    TasksCompleted = completed,
                    TasksTotal = total
                });
            }
        }

        public static void WriteTaskSummaryToText()
        {
            Utils.Write("=== TASK SUMMARY ===");

            foreach (var p in Current.Players)
            {
                if (p.TasksTotal > 0)
                {
                    Utils.Write($"{p.Name} {p.Color}: {p.TasksCompleted}/{p.TasksTotal}");
                }
            }
        }

        public static void SaveJson(string path)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            File.WriteAllText(path, JsonSerializer.Serialize(Current, options));
        }
    }
}
'''

files["GameLogger/Patches/TimePatches.cs"] = r'''using System.Diagnostics;
using HarmonyLib;

namespace GameLogger
{
    [HarmonyPatch]
    public class TimerLogs
    {
        public static Stopwatch Watch { get; set; } = new();

        [HarmonyPatch(typeof(ShipStatus), nameof(ShipStatus.Awake))]
        [HarmonyPostfix]
        public static void Start()
        {
            Watch.Reset();
            Watch.Start();

            var map = Utils.GetMap();
            var mode = GameOptionsManager.Instance.currentGameMode.ToString();

            StructuredLog.Reset(map, mode);
            StructuredLog.Add("game_start", detail: $"Started game on {map} - game mode: {mode}");
            Utils.Write($"Started game on {map} - game mode: {mode}");
        }

        [HarmonyPatch(typeof(AmongUsClient), nameof(AmongUsClient.OnGameEnd))]
        [HarmonyPostfix]
        public static void End()
        {
            Watch.Stop();
            StructuredLog.Finish(Watch.Elapsed.TotalSeconds);
            StructuredLog.WriteTaskSummaryToText();

            Utils.Write($"Game finished in {Watch.Elapsed.Minutes} minutes");
            StructuredLog.Add("game_end", detail: $"Game finished in {Watch.Elapsed.TotalSeconds:0} seconds");
            Watch.Reset();
        }

        [HarmonyPatch(typeof(AmongUsClient), nameof(AmongUsClient.OnDisconnected))]
        [HarmonyPostfix]
        public static void OnDC(AmongUsClient __instance)
        {
            if (__instance.AmClient) Watch.Reset();
        }
    }
}
'''

files["GameLogger/Patches/LobbyPatches.cs"] = r'''using System;
using System.IO;
using HarmonyLib;

namespace GameLogger
{
    [HarmonyPatch]
    public class LobbyLogs
    {
        [HarmonyPatch(typeof(LobbyBehaviour), nameof(LobbyBehaviour.Start))]
        [HarmonyPostfix]
        public static void Postfix()
        {
            if (GameLogger.Builder.Length > 0)
            {
                if (!Directory.Exists("GameLogs")) Directory.CreateDirectory("GameLogs");

                var safeMap = string.IsNullOrWhiteSpace(StructuredLog.Current.Map)
                    ? Utils.GetMap()
                    : StructuredLog.Current.Map;

                var baseName = $"{DateTime.Now:u}_{safeMap}".Replace(":", "-");
                var txtPath = $"GameLogs\\{baseName}.txt";
                var jsonPath = $"GameLogs\\{baseName}.json";

                File.AppendAllText(txtPath, GameLogger.Builder.ToString());
                StructuredLog.SaveJson(jsonPath);

                GameLogger.Builder.Clear();
            }

            TimerLogs.Watch.Reset();
            TaskLogs.State = TaskLogs.TaskStates.None;
        }
    }
}
'''

files["GameLogger/Patches/KillPatches.cs"] = r'''using HarmonyLib;

namespace GameLogger
{
    [HarmonyPatch]
    public class KillLogs
    {
        [HarmonyPatch(typeof(PlayerControl), nameof(PlayerControl.MurderPlayer))]
        [HarmonyPrefix]
        public static void Prefix(PlayerControl __instance, ref PlayerControl target, ref MurderResultFlags resultFlags)
        {
            var killer = Utils.FullName(__instance.Data);
            var victim = Utils.FullName(target.Data);
            var location = Utils.GetLocation(target);

            if (resultFlags.HasFlag(MurderResultFlags.FailedProtected) ||
                (resultFlags.HasFlag(MurderResultFlags.DecisionByHost) && target.protectedByGuardianId > -1))
            {
                Utils.Write($"{killer} failed to kill {victim} {location}");
                StructuredLog.Add("kill_blocked", killer, victim, location: location);
            }
            else if (resultFlags.HasFlag(MurderResultFlags.Succeeded) ||
                     resultFlags.HasFlag(MurderResultFlags.DecisionByHost))
            {
                Utils.Write($"{killer} killed {victim} {location}");
                StructuredLog.Add("kill", killer, victim, location: location);
            }
        }

        [HarmonyPatch(typeof(PlayerControl), nameof(PlayerControl.ProtectPlayer))]
        [HarmonyPostfix]
        public static void Protect(PlayerControl __instance, ref PlayerControl target)
        {
            var source = Utils.FullName(__instance.Data);
            var targetName = Utils.FullName(target.Data);
            Utils.Write($"{source} set protection on {targetName}");
            StructuredLog.Add("protection", source, targetName);
        }
    }
}
'''

files["GameLogger/Patches/MeetingPatches.cs"] = r'''using HarmonyLib;
using Il2CppInterop.Runtime.InteropTypes.Arrays;

namespace GameLogger
{
    [HarmonyPatch]
    public class MeetingLogs
    {
        [HarmonyPatch(typeof(MeetingHud), nameof(MeetingHud.CoIntro))]
        [HarmonyPostfix]
        public static void Start(
            ref GameData.PlayerInfo reporter,
            ref GameData.PlayerInfo reportedBody,
            ref Il2CppReferenceArray<GameData.PlayerInfo> deadBodies)
        {
            string reporterName = reporter == null ? "" : Utils.FullName(reporter);
            string targetName = reportedBody == null ? "" : Utils.FullName(reportedBody);
            bool emergency = reportedBody == null;
            string action = emergency
                ? "This is a emergency meeting"
                : $"{targetName}'s body was found";

            string bodytext = "Players died this round: ";
            if (deadBodies.Length == 0)
            {
                bodytext = "No one died this round";
            }
            else
            {
                foreach (var body in deadBodies)
                {
                    bodytext += $"{Utils.FullName(body)}, ";
                }
                bodytext = bodytext.Remove(bodytext.LastIndexOf(","));
            }

            Utils.Write($"Meeting started by {reporterName}", action, bodytext);
            StructuredLog.StartMeeting(
                reporter == null ? (byte)255 : reporter.PlayerId,
                reporterName,
                reportedBody == null ? null : reportedBody.PlayerId,
                targetName,
                emergency);
            StructuredLog.Add("meeting", reporterName, targetName, $"{action} | {bodytext}");
        }

        [HarmonyPatch(typeof(MeetingHud), nameof(MeetingHud.PopulateResults))]
        [HarmonyPostfix]
        public static void CheckVotes(
            [HarmonyArgument(0)] Il2CppStructArray<MeetingHud.VoterState> states)
        {
            if (states == null) return;

            StructuredLog.ClearCurrentVotes();
            string text = "Vote results:\n";

            foreach (var vote in states)
            {
                if (vote.AmDead) continue;

                var voter = GameData.Instance.GetPlayerById(vote.VoterId);
                if (voter == null) continue;

                string voterName = Utils.FullName(voter);

                if (vote.SkippedVote)
                {
                    text += $"{voterName} skipped\n";
                    StructuredLog.AddVote(voter.PlayerId, voterName, null, "", "skip");
                    continue;
                }

                if (vote.VotedForId == 254)
                {
                    text += $"{voterName} did not vote\n";
                    StructuredLog.AddVote(voter.PlayerId, voterName, null, "", "no_vote");
                    continue;
                }

                if (vote.VotedForId == byte.MaxValue)
                {
                    continue;
                }

                var votedFor = GameData.Instance.GetPlayerById(vote.VotedForId);
                if (votedFor == null)
                {
                    text += $"{voterName} voted for unknown player #{vote.VotedForId}\n";
                    StructuredLog.AddVote(
                        voter.PlayerId,
                        voterName,
                        vote.VotedForId,
                        "",
                        "unknown_target");
                    continue;
                }

                string targetName = Utils.FullName(votedFor);
                text += $"{voterName} voted for {targetName}\n";
                StructuredLog.AddVote(
                    voter.PlayerId,
                    voterName,
                    votedFor.PlayerId,
                    targetName,
                    "player");
            }

            Utils.Write(text.TrimEnd());
        }

        [HarmonyPatch(typeof(ExileController), nameof(ExileController.Begin))]
        [HarmonyPostfix]
        public static void End(ExileController __instance)
        {
            Utils.Write(__instance.completeString);
            StructuredLog.SetMeetingExile(__instance.completeString);
            StructuredLog.Add("exile_result", detail: __instance.completeString);
        }
    }
}
'''

files["GameLogger/Patches/SabotagePatches.cs"] = r'''
using System;
using System.Reflection;
using HarmonyLib;

namespace GameLogger
{
    [HarmonyPatch]
    public class SabotageLogs
    {
        private static string lastActionKey = "";
        private static DateTime lastActionAt = DateTime.MinValue;

        private static bool IsRelevantSystem(SystemTypes system)
        {
            return system == SystemTypes.Sabotage
                || system == SystemTypes.Reactor
                || system == SystemTypes.Laboratory
                || system == SystemTypes.Electrical
                || system == SystemTypes.LifeSupp
                || system == SystemTypes.Comms
                || system == SystemTypes.HeliSabotage
                || system == SystemTypes.MushroomMixupSabotage;
        }

        private static void LogSystemAction(
            SystemTypes systemType,
            PlayerControl player,
            byte amount,
            string source)
        {
            if (!IsRelevantSystem(systemType) || player == null || player.Data == null) return;

            var now = DateTime.UtcNow;
            var key = $"{systemType}|{player.PlayerId}|{amount}";

            // ShipStatus.UpdateSystem normally calls the concrete RepairDamage method.
            // Keep both hooks as fallbacks for BOR/network differences, but suppress the
            // immediate duplicate when both see the same action.
            if (key == lastActionKey && (now - lastActionAt).TotalMilliseconds < 150)
            {
                return;
            }

            lastActionKey = key;
            lastActionAt = now;

            var name = Utils.FullName(player.Data);
            Utils.Write($"[SYSTEM] type={systemType} player={name} amount={amount} source={source}");
            StructuredLog.Add(
                "system_update",
                player: name,
                detail: $"source={source}",
                system: systemType.ToString(),
                amount: amount);
        }

        [HarmonyPatch(typeof(ShipStatus), nameof(ShipStatus.UpdateSystem),
            new Type[] { typeof(SystemTypes), typeof(PlayerControl), typeof(byte) })]
        [HarmonyPrefix]
        public static void SystemUpdate(
            [HarmonyArgument(0)] SystemTypes systemType,
            [HarmonyArgument(1)] PlayerControl player,
            [HarmonyArgument(2)] byte amount)
        {
            LogSystemAction(systemType, player, amount, "ShipStatus.UpdateSystem");
        }

        // The next hooks sit one layer lower than ShipStatus.UpdateSystem. They are
        // intentionally redundant: on some BOR/client paths the generic ShipStatus
        // hook does not expose the remote player, while RepairDamage still receives it.

        [HarmonyPatch(typeof(SabotageSystemType), nameof(SabotageSystemType.RepairDamage))]
        [HarmonyPrefix]
        public static void SabotageRepairDamage(
            [HarmonyArgument(0)] PlayerControl player,
            [HarmonyArgument(1)] byte amount)
        {
            LogSystemAction(SystemTypes.Sabotage, player, amount, "SabotageSystemType.RepairDamage");
        }

        [HarmonyPatch(typeof(ReactorSystemType), nameof(ReactorSystemType.RepairDamage))]
        [HarmonyPrefix]
        public static void ReactorRepairDamage(
            [HarmonyArgument(0)] PlayerControl player,
            [HarmonyArgument(1)] byte amount)
        {
            // ReactorSystemType is also used for Laboratory on Polus.
            // For Crew'mong Us stats both are the same sabotage family, so Reactor is
            // a safe fallback when the generic hook did not expose the original type.
            LogSystemAction(SystemTypes.Reactor, player, amount, "ReactorSystemType.RepairDamage");
        }

        [HarmonyPatch(typeof(SwitchSystem), nameof(SwitchSystem.RepairDamage))]
        [HarmonyPrefix]
        public static void ElectricalRepairDamage(
            [HarmonyArgument(0)] PlayerControl player,
            [HarmonyArgument(1)] byte amount)
        {
            LogSystemAction(SystemTypes.Electrical, player, amount, "SwitchSystem.RepairDamage");
        }

        [HarmonyPatch(typeof(LifeSuppSystemType), nameof(LifeSuppSystemType.RepairDamage))]
        [HarmonyPrefix]
        public static void OxygenRepairDamage(
            [HarmonyArgument(0)] PlayerControl player,
            [HarmonyArgument(1)] byte amount)
        {
            LogSystemAction(SystemTypes.LifeSupp, player, amount, "LifeSuppSystemType.RepairDamage");
        }

        [HarmonyPatch(typeof(HeliSabotageSystem), nameof(HeliSabotageSystem.RepairDamage))]
        [HarmonyPrefix]
        public static void HeliRepairDamage(
            [HarmonyArgument(0)] PlayerControl player,
            [HarmonyArgument(1)] byte amount)
        {
            LogSystemAction(SystemTypes.HeliSabotage, player, amount, "HeliSabotageSystem.RepairDamage");
        }

        // Comms implementations are internal in some game builds. Dynamic Harmony
        // targets let the plugin use them when available without a hard compile-time
        // dependency on their visibility.
        [HarmonyPatch]
        public static class HudOverrideRepairDamagePatch
        {
            public static bool Prepare()
            {
                var type = AccessTools.TypeByName("HudOverrideSystemType");
                return type != null && AccessTools.Method(type, "RepairDamage") != null;
            }

            public static MethodBase TargetMethod()
            {
                var type = AccessTools.TypeByName("HudOverrideSystemType");
                return AccessTools.Method(type, "RepairDamage");
            }

            [HarmonyPrefix]
            public static void Prefix(
                [HarmonyArgument(0)] PlayerControl player,
                [HarmonyArgument(1)] byte amount)
            {
                LogSystemAction(SystemTypes.Comms, player, amount, "HudOverrideSystemType.RepairDamage");
            }
        }

        [HarmonyPatch]
        public static class HqHudRepairDamagePatch
        {
            public static bool Prepare()
            {
                var type = AccessTools.TypeByName("HqHudSystemType");
                return type != null && AccessTools.Method(type, "RepairDamage") != null;
            }

            public static MethodBase TargetMethod()
            {
                var type = AccessTools.TypeByName("HqHudSystemType");
                return AccessTools.Method(type, "RepairDamage");
            }

            [HarmonyPrefix]
            public static void Prefix(
                [HarmonyArgument(0)] PlayerControl player,
                [HarmonyArgument(1)] byte amount)
            {
                LogSystemAction(SystemTypes.Comms, player, amount, "HqHudSystemType.RepairDamage");
            }
        }

        [HarmonyPatch(typeof(PlayerControl), nameof(PlayerControl.AddSystemTask))]
        [HarmonyPostfix]
        public static void Start(ref SystemTypes system)
        {
            string sabtext = "Sabotage started: ";
            switch (system)
            {
                case SystemTypes.Reactor:
                case SystemTypes.Laboratory:
                    sabtext += "Reactor";
                    break;
                case SystemTypes.Electrical:
                    sabtext += "Lights";
                    break;
                case SystemTypes.LifeSupp:
                    sabtext += "Oxygen";
                    break;
                case SystemTypes.Comms:
                    sabtext += "Comms";
                    break;
                case SystemTypes.HeliSabotage:
                    sabtext += "Heli";
                    break;
                case SystemTypes.MushroomMixupSabotage:
                    sabtext += "Mushroom Mixup";
                    break;
                default:
                    sabtext += system.ToString();
                    break;
            }

            Utils.Write(sabtext);
            StructuredLog.Add("sabotage_start", detail: sabtext, system: system.ToString());
        }

        [HarmonyPatch(typeof(PlayerControl), nameof(PlayerControl.RemoveTask))]
        [HarmonyPostfix]
        public static void Postfix(ref PlayerTask task)
        {
            switch (task.TaskType)
            {
                case TaskTypes.ResetReactor:
                case TaskTypes.ResetSeismic:
                case TaskTypes.RestoreOxy:
                case TaskTypes.FixComms:
                case TaskTypes.FixLights:
                case TaskTypes.StopCharles:
                case TaskTypes.MushroomMixupSabotage:
                    bool meeting = MeetingHud.Instance != null;
                    string detail = meeting
                        ? "Sabotage ended by meeting"
                        : "Sabotage ended / fixed";

                    Utils.Write(detail);
                    StructuredLog.Add(
                        "sabotage_end",
                        detail: detail,
                        system: task.TaskType.ToString());
                    break;
            }
        }
    }
}
'''

files["GameLogger/Patches/PlayerInfoPatches.cs"] = r'''using AmongUs.GameOptions;
using HarmonyLib;

namespace GameLogger
{
    [HarmonyPatch]
    public class PlayerDataLogs
    {
        [HarmonyPatch(typeof(GameData), nameof(GameData.SetTasks))]
        [HarmonyPostfix]
        public static void Postfix(ref byte playerId)
        {
            if (PlayerControl.LocalPlayer.PlayerId != playerId) return;

            string roletext = "Player's Roles:\n";
            foreach (var player in PlayerControl.AllPlayerControls)
            {
                roletext += $"{Utils.FullName(player.Data)} : {player.Data.Role.Role}\n";
                StructuredLog.Add(
                    "role",
                    player: Utils.FullName(player.Data),
                    detail: player.Data.Role.Role.ToString());
            }
            Utils.Write(roletext);
        }

        [HarmonyPatch(typeof(PlayerControl), nameof(PlayerControl.SetRole))]
        [HarmonyPostfix]
        public static void CheckGuardianAngel(PlayerControl __instance, ref RoleTypes role)
        {
            if (role is RoleTypes.GuardianAngel)
            {
                var player = Utils.FullName(__instance.Data);
                string text = $"{player}, became guardian angel";
                Utils.Write(text);
                StructuredLog.Add("role_change", player: player, detail: "GuardianAngel");
            }
        }

        [HarmonyPatch(typeof(GameData), nameof(GameData.HandleDisconnect), typeof(PlayerControl), typeof(DisconnectReasons))]
        [HarmonyPostfix]
        public static void Postfix(ref PlayerControl player)
        {
            if (player.Data.Disconnected && !player.Data.IsDead)
            {
                var name = Utils.FullName(player.Data);
                Utils.Write($"{name} disconnected");
                StructuredLog.Add("disconnect", player: name);
            }
        }
    }
}
'''

files["GameLogger/Patches/EndGamePatches.cs"] = r'''using HarmonyLib;

namespace GameLogger
{
    [HarmonyPatch]
    public class EndGameLogs
    {
        [HarmonyPatch(typeof(EndGameResult), nameof(EndGameResult.Create))]
        [HarmonyPostfix]
        public static void Postfix(ref EndGameResult __result)
        {
            string text = "Winners: ";
            switch (__result.GameOverReason)
            {
                case GameOverReason.HumansByVote:
                    text += "Crewmates by voting out Impostors";
                    break;
                case GameOverReason.HumansByTask:
                    text += "Crewmates by task win";
                    break;
                case GameOverReason.ImpostorByVote:
                    text += "Impostors by voting out a crewmate";
                    break;
                case GameOverReason.ImpostorByKill:
                case GameOverReason.HideAndSeek_ByKills:
                    text += "Impostors by killing";
                    break;
                case GameOverReason.ImpostorBySabotage:
                    text += "Impostors by sabotage";
                    break;
                case GameOverReason.HumansDisconnect:
                    text += "Impostors by a crewmate disconnect";
                    break;
                case GameOverReason.ImpostorDisconnect:
                    text += "Crewmates by a impostor disconnect";
                    break;
                case GameOverReason.HideAndSeek_ByTimer:
                    text += "Crewmates by reaching 0 hide time left";
                    break;
                default:
                    text += __result.GameOverReason.ToString();
                    break;
            }

            Utils.Write(text);
            StructuredLog.SetWinner(text);
            StructuredLog.Add("winner", detail: text);
        }
    }
}
'''

for relative, content in files.items():
    path = root / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

print("Crew'mong Us GameLogger v2.1 patch applied.")
