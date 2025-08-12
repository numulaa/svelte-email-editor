<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import pkg from '../package.json';
  import { loadScript } from './lib/loadScript';
  import type { Editor, EmailEditorProps, ExportHtmlResultType, UnlayerOptions } from './types';
  import type { JSONTemplate, ToolsConfig } from "state/types/types";

// PROPS
let { design = null, tools, options = {}, scriptUrl='https://editor.unlayer.com/embed.js?2', onLoaded, onDesignUpdated, onExportHtml}: EmailEditorProps = $props();

  // === Internal ===
  let editor: Editor | null = null;
  const dispatch = createEventDispatcher();

  const win: any =
    typeof window === 'undefined' ? { __unlayer_lastEditorId: 0 } : window;
  win.__unlayer_lastEditorId = win.__unlayer_lastEditorId || 0;
  const editorId = `editor-${++win.__unlayer_lastEditorId}`;

  function getInitOptions() {
    return {
      ...(options || {}),
      tools: tools || options?.tools,
      id: editorId,
      source: { name: pkg.name, version: pkg.version }
    };
  }

  function bindUnlayerEvents() {
    editor?.addEventListener('editor:ready', () => {
      onLoaded?.(editor)
      if (design) {
        editor?.loadDesign(design);
      }
    });

    editor?.addEventListener('design-updated', (data: JSONTemplate) => {
      onDesignUpdated?.(data);
    });

    editor?.addEventListener('export-html', (data:ExportHtmlResultType) => {
      onExportHtml?.(data)
    });
  }

  onMount(async () => {
    await loadScript(scriptUrl);
    editor = unlayer.createEditor(getInitOptions());
    bindUnlayerEvents();
  });

  onDestroy(() => {
    editor?.destroy();
  });

  // === Public Methods ===
  export function getEditor() {
    return editor;
  }
  export function loadDesign(newDesign: JSONTemplate) {
    editor?.loadDesign(newDesign);
  }
  export function exportHtml(callback: (data: ExportHtmlResultType) => void) {
    editor?.exportHtml(callback);
  }
  export function saveDesign(callback:(data:JSONTemplate)=> void){
    editor?.saveDesign(callback)
  }

 
  $effect(() => {
     
     // === Reactive: Update design when prop changes ===
    if (editor && design) {
    editor.loadDesign(design);
    }    
  })

  $effect(()=> {
    if (!editor) return;
     // === Reactive: Update tools when prop changes ===
    if (tools && editor && 'setTools' in editor) {
    (editor as Editor & { setTools: (t: ToolsConfig) => void }).setTools(tools);
    }
  })

</script>

<!-- === Layout: Fill Parent Responsively === -->
<div style="flex: 1; display: flex; width: 100%; height: 100%;">
  <div id={editorId} style="flex: 1; width: 100%; height: 100%;"></div>
</div>
