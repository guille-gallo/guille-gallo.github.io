import type { Component, JSX, ParentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import Accessibility from "lucide-solid/icons/accessibility";
import Activity from "lucide-solid/icons/activity";
import Bell from "lucide-solid/icons/bell";
import BellRing from "lucide-solid/icons/bell-ring";
import Bookmark from "lucide-solid/icons/bookmark";
import BugOff from "lucide-solid/icons/bug-off";
import ChartBarBig from "lucide-solid/icons/chart-bar-big";
import ChartColumn from "lucide-solid/icons/chart-column";
import ChartLine from "lucide-solid/icons/chart-line";
import CircleAlert from "lucide-solid/icons/circle-alert";
import CircleCheck from "lucide-solid/icons/circle-check";
import ClipboardList from "lucide-solid/icons/clipboard-list";
import Clock from "lucide-solid/icons/clock";
import Cloud from "lucide-solid/icons/cloud";
import Code from "lucide-solid/icons/code";
import CodeXml from "lucide-solid/icons/code-xml";
import Coins from "lucide-solid/icons/coins";
import Cpu from "lucide-solid/icons/cpu";
import Crosshair from "lucide-solid/icons/crosshair";
import Database from "lucide-solid/icons/database";
import FileCode from "lucide-solid/icons/file-code";
import FileInput from "lucide-solid/icons/file-input";
import FileText from "lucide-solid/icons/file-text";
import Film from "lucide-solid/icons/film";
import Flag from "lucide-solid/icons/flag";
import GitBranch from "lucide-solid/icons/git-branch";
import Grid3x3 from "lucide-solid/icons/grid-3x3";
import Headphones from "lucide-solid/icons/headphones";
import Heart from "lucide-solid/icons/heart";
import Highlighter from "lucide-solid/icons/highlighter";
import Info from "lucide-solid/icons/info";
import Layers from "lucide-solid/icons/layers";
import LayoutDashboard from "lucide-solid/icons/layout-dashboard";
import LayoutPanelLeft from "lucide-solid/icons/layout-panel-left";
import LayoutTemplate from "lucide-solid/icons/layout-template";
import Loader from "lucide-solid/icons/loader";
import Lock from "lucide-solid/icons/lock";
import LogIn from "lucide-solid/icons/log-in";
import Mail from "lucide-solid/icons/mail";
import Map from "lucide-solid/icons/map";
import MapPin from "lucide-solid/icons/map-pin";
import MessageCircle from "lucide-solid/icons/message-circle";
import MessageSquare from "lucide-solid/icons/message-square";
import Monitor from "lucide-solid/icons/monitor";
import MonitorSmartphone from "lucide-solid/icons/monitor-smartphone";
import MousePointerClick from "lucide-solid/icons/mouse-pointer-click";
import Move from "lucide-solid/icons/move";
import Newspaper from "lucide-solid/icons/newspaper";
import Package from "lucide-solid/icons/package";
import Palette from "lucide-solid/icons/palette";
import Paperclip from "lucide-solid/icons/paperclip";
import PenTool from "lucide-solid/icons/pen-tool";
import Radio from "lucide-solid/icons/radio";
import RefreshCcw from "lucide-solid/icons/refresh-ccw";
import RefreshCw from "lucide-solid/icons/refresh-cw";
import Rocket from "lucide-solid/icons/rocket";
import Route from "lucide-solid/icons/route";
import Rss from "lucide-solid/icons/rss";
import Save from "lucide-solid/icons/save";
import Search from "lucide-solid/icons/search";
import Server from "lucide-solid/icons/server";
import Settings from "lucide-solid/icons/settings";
import Shield from "lucide-solid/icons/shield";
import ShieldCheck from "lucide-solid/icons/shield-check";
import Sparkles from "lucide-solid/icons/sparkles";
import TestTube from "lucide-solid/icons/test-tube";
import Trash from "lucide-solid/icons/trash";
import TrendingUp from "lucide-solid/icons/trending-up";
import Type from "lucide-solid/icons/type";
import UserCheck from "lucide-solid/icons/user-check";
import UserPlus from "lucide-solid/icons/user-plus";
import Users from "lucide-solid/icons/users";
import WandSparkles from "lucide-solid/icons/wand-sparkles";
import Wifi from "lucide-solid/icons/wifi";
import Wrench from "lucide-solid/icons/wrench";
import Zap from "lucide-solid/icons/zap";
import SquareCheck from "lucide-solid/icons/square-check";
import CirclePlay from "lucide-solid/icons/circle-play";

type IconComponent = Component<JSX.SvgSVGAttributes<SVGSVGElement>>;

/**
 * Icons available to MDX content as <Feature icon="kebab-name">.
 * Keys are the names used in src/content (lucide's older names are mapped to their current files).
 * Explicit imports keep the bundle small; add an entry here when an MDX file uses a new icon.
 */
export const featureIcons: Record<string, IconComponent> = {
  "accessibility": Accessibility,
  "activity": Activity,
  "alert-circle": CircleAlert,
  "bar-chart-2": ChartBarBig,
  "bar-chart-3": ChartColumn,
  "bell": Bell,
  "bell-ring": BellRing,
  "bookmark": Bookmark,
  "bug-off": BugOff,
  "check-circle": CircleCheck,
  "clipboard-list": ClipboardList,
  "clock": Clock,
  "cloud": Cloud,
  "code": Code,
  "code-2": CodeXml,
  "coins": Coins,
  "cpu": Cpu,
  "crosshair": Crosshair,
  "database": Database,
  "file-code": FileCode,
  "file-input": FileInput,
  "file-text": FileText,
  "film": Film,
  "flag": Flag,
  "git-branch": GitBranch,
  "grid-3x3": Grid3x3,
  "headphones": Headphones,
  "heart": Heart,
  "highlighter": Highlighter,
  "info": Info,
  "layers": Layers,
  "layout": LayoutPanelLeft,
  "layout-dashboard": LayoutDashboard,
  "layout-template": LayoutTemplate,
  "line-chart": ChartLine,
  "loader": Loader,
  "lock": Lock,
  "log-in": LogIn,
  "mail": Mail,
  "map": Map,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  "message-square": MessageSquare,
  "monitor": Monitor,
  "monitor-smartphone": MonitorSmartphone,
  "mouse-pointer-click": MousePointerClick,
  "move": Move,
  "newspaper": Newspaper,
  "package": Package,
  "palette": Palette,
  "paperclip": Paperclip,
  "pen-tool": PenTool,
  "radio": Radio,
  "refresh-ccw": RefreshCcw,
  "refresh-cw": RefreshCw,
  "rocket": Rocket,
  "route": Route,
  "rss": Rss,
  "save": Save,
  "search": Search,
  "server": Server,
  "settings": Settings,
  "shield": Shield,
  "shield-check": ShieldCheck,
  "sparkles": Sparkles,
  "test-tube": TestTube,
  "trash": Trash,
  "trending-up": TrendingUp,
  "type": Type,
  "user-check": UserCheck,
  "user-plus": UserPlus,
  "users": Users,
  "wand-2": WandSparkles,
  "wifi": Wifi,
  "wrench": Wrench,
  "zap": Zap,
  "check-square": SquareCheck,
  "play-circle": CirclePlay,
  "trash-2": Trash,
};

interface FeatureProps {
  icon: string;
  title: string;
}

export function Feature(props: ParentProps<FeatureProps>) {
  const Icon = () => featureIcons[props.icon];

  return (
    <div class="my-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div class="mb-2 flex items-center gap-2">
        {Icon() && (
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Dynamic component={Icon()} class="h-4 w-4" />
          </div>
        )}
        <h4 class="font-semibold text-gray-900">{props.title}</h4>
      </div>
      <div class="ml-10 text-sm text-gray-600">{props.children}</div>
    </div>
  );
}
