/// <reference path="../node_modules/unlayer-types/embed.d.ts" />

import Embed from "embed/index";
import { Editor as EditorClass } from "embed/Editor";
import type { ExportHtmlResult } from "embed/Config";
import type {
  AppearanceConfig,
  DisplayMode,
  ToolsConfig,
  JSONTemplate,
} from "state/types/types";

export type Unlayer = typeof Embed;
export type UnlayerOptions = Parameters<Unlayer["createEditor"]>[0];
export type Editor = InstanceType<typeof EditorClass>;
export type ExportHtmlResultType = ExportHtmlResult;

export interface EditorRef {
  editor: Editor | null;
}

// export interface EmailEditorProps {
//   editorId?: string | undefined;
//   minHeight?: number | string | undefined;
//   onLoad?(unlayer: Editor): void;
//   onReady?(unlayer: Editor): void;
//   options?: UnlayerOptions | undefined;
//   scriptUrl?: string | undefined;
//   tools?: ToolsConfig | null;
//   //   style?: CSSProperties | undefined;
// }
export interface EmailEditorProps {
  editorId?: string | undefined;
  minHeight?: number | string | undefined;
  design?: JSONTemplate | null;
  tools?: ToolsConfig;
  options?: UnlayerOptions;
  scriptUrl: string;
  onLoaded?: (editor: any) => void;
  onDesignUpdated?: (data: JSONTemplate) => void;
  onExportHtml?: (data: ExportHtmlResultType) => void;
}
// Let Svelte know about the event
interface EmailEditorEvents {
  "design-updated": CustomEvent<JSONTemplate>;
}
declare global {
  const unlayer: Unlayer;

  interface Window {
    __unlayer_lastEditorId: number;
  }

  interface HTMLElementEventMap extends EmailEditorEvents {}
}
