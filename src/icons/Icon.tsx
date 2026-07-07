import type { ComponentType, SVGProps } from "react";
import { ArrowIcon } from "./ArrowIcon";
import { ChevronIcon } from "./ChevronIcon";
import {
  ActionsIcon,
  ActivityIcon,
  AddIcon,
  AnalyticsIcon,
  ApprovalIcon,
  ArchiveIcon,
  AttachmentIcon,
  BookIcon,
  BulbIcon,
  CautionIcon,
  ChatIcon,
  ChatProIcon,
  CheckboxIcon,
  ClearIcon,
  ClockIcon,
  CopyIcon,
  CriticalIcon,
  DateIcon,
  DefectReportIcon,
  DocumentIcon,
  DoneIcon,
  DownloadIcon,
  ExpandIcon,
  FileIcon,
  FiltersIcon,
  FixesIcon,
  FolderIcon,
  FolderStarredIcon,
  FormIcon,
  FormsIcon,
  GapIcon,
  HeartIcon,
  InformationIcon,
  InviteIcon,
  IssuesIcon,
  LocationIcon,
  LogOutIcon,
  MentionIcon,
  MenuIcon,
  MicrophoneIcon,
  MinusIcon,
  MoreIcon,
  PenIcon,
  PersonIcon,
  PlusIcon,
  PreviewIcon,
  QualityIcon,
  RefreshIcon,
  ReportActionsIcon,
  ReportIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShipIcon,
  SidebarIcon,
  SparklesIcon,
  SpeakerIcon,
  SpinnerIcon,
  StarIcon,
  StatusIcon,
  TaskIcon,
  TasksIcon,
  TickIcon,
  TrashIcon,
  UndoIcon,
  UploadIcon,
  UsersIcon,
  WorkflowIcon,
} from "./generated";
import type { ArrowDirection, ChevronDirection, IconProps } from "./types";

const iconRegistry = {
  heart: HeartIcon,
  clear: ClearIcon,
  chevron: ChevronIcon,
  arrow: ArrowIcon,
  attachment: AttachmentIcon,
  microphone: MicrophoneIcon,
  add: AddIcon,
  plus: PlusIcon,
  done: DoneIcon,
  minus: MinusIcon,
  send: SendIcon,
  search: SearchIcon,
  star: StarIcon,
  analytics: AnalyticsIcon,
  trash: TrashIcon,
  chat: ChatIcon,
  chatPro: ChatProIcon,
  filters: FiltersIcon,
  pen: PenIcon,
  tick: TickIcon,
  document: DocumentIcon,
  sparkles: SparklesIcon,
  expand: ExpandIcon,
  speaker: SpeakerIcon,
  copy: CopyIcon,
  date: DateIcon,
  refresh: RefreshIcon,
  activity: ActivityIcon,
  menu: MenuIcon,
  invite: InviteIcon,
  report: ReportIcon,
  sidebar: SidebarIcon,
  download: DownloadIcon,
  upload: UploadIcon,
  preview: PreviewIcon,
  fixes: FixesIcon,
  issues: IssuesIcon,
  more: MoreIcon,
  bulb: BulbIcon,
  ship: ShipIcon,
  person: PersonIcon,
  archive: ArchiveIcon,
  logOut: LogOutIcon,
  settings: SettingsIcon,
  tasks: TasksIcon,
  workflow: WorkflowIcon,
  form: FormIcon,
  approval: ApprovalIcon,
  forms: FormsIcon,
  book: BookIcon,
  mention: MentionIcon,
  actions: ActionsIcon,
  critical: CriticalIcon,
  information: InformationIcon,
  caution: CautionIcon,
  folder: FolderIcon,
  folderStarred: FolderStarredIcon,
  quality: QualityIcon,
  location: LocationIcon,
  users: UsersIcon,
  undo: UndoIcon,
  spinner: SpinnerIcon,
  clock: ClockIcon,
  gap: GapIcon,
  defectReport: DefectReportIcon,
  task: TaskIcon,
  file: FileIcon,
  reportActions: ReportActionsIcon,
  checkbox: CheckboxIcon,
  status: StatusIcon,
} as const;

export type IconName = keyof typeof iconRegistry;

type DirectionProps =
  | { name: "chevron"; direction?: ChevronDirection }
  | { name: "arrow"; direction?: ArrowDirection }
  | { name: Exclude<IconName, "chevron" | "arrow"> };

export type IconRegistryProps = IconProps &
  DirectionProps & {
    className?: string;
  } & Omit<SVGProps<SVGSVGElement>, "ref">;

export const Icon = ({
  name,
  size = "large",
  filled,
  className,
  ...props
}: IconRegistryProps) => {
  const Component = iconRegistry[name] as ComponentType<
    IconProps & SVGProps<SVGSVGElement>
  >;

  return (
    <Component
      size={size}
      filled={filled}
      className={className}
      {...props}
    />
  );
};

Icon.displayName = "Icon";

export { iconRegistry };
