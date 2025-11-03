import GettingStarted from "./sections/01-getting-started.svx";
import LicenseNote from "./sections/02-license-note.svx";
import LogContexts from "./sections/03-log-contexts.svx";
import BuiltinLogIngestion from "./sections/04-builtin-log-ingestion.svx";
import ManualLogIngestion from "./sections/05-manual-log-ingestion.svx";
import IntroSearching from "./sections/07-intro-searching.svx";
import Hunting from "./sections/08-hunting.svx";
import BossOfTheSOC from "./sections/09-boss-of-the-soc.svx";
import AWSFlowLogs from "./sections/10-aws-vpc-flow-logs.svx";
import Timelining from "./sections/11-timelining.svx";


import Exercise from "./sections/exercise.svx";
import Troubleshooting from "./sections/troubleshooting.svx";

const pages = [
    ["Getting Started", GettingStarted],
    ["License Note", LicenseNote],
    ["Log Contexts", LogContexts],
    ["Built-in Log Ingestion", BuiltinLogIngestion],
    ["Manual Log Ingestion", ManualLogIngestion],
    ["Introduction to Searching", IntroSearching],
    ["Hunting", Hunting],
    ["BotS (1)", BossOfTheSOC],
    ["BotS (2)", AWSFlowLogs],
    ["Timelining", Timelining],
    ["Exercise", Exercise],
    ["Troubleshooting", Troubleshooting],
] satisfies [string, any][];

export default pages
