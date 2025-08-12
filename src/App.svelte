<script lang="ts">
   import EmailEditor from './EmailEditor.svelte';
   import sampleDesign from './sample.json'
   import demoDesign from './demo.json'
   import { type JSONTemplate } from 'state/types/types';

  let editorRef:EmailEditor | null = null;
  let currentDesign:JSONTemplate = sampleDesign as JSONTemplate;
  let currentTools = { image: { enabled: true } };
  
function exportHTMLHandler(){
  editorRef?.exportHtml?.((data) => {
    console.log('Exported HTML:', data.html);
    console.log('Exported design:', data.design);
  }); 
}
function saveDesign(){
  editorRef?.saveDesign?.((design) => {
    // currentDesign = {...design}
    console.log('saveDesign', design);
    alert('Design JSON has been logged in your developer console.');
})
 }

  function disableImageTool() {
    currentTools = { image: { enabled: false } };
  }
</script>

<main class="main">
  <header>
    <nav class="navigation">
      <div>
        Built by Nurul Mukhlisa
      </div>
      <div>
        <button on:click={saveDesign}>Save Design</button>
      <button on:click={exportHTMLHandler}>Export HTML</button>
      </div>
    </nav>
  </header>
 <EmailEditor
  scriptUrl='https://editor.unlayer.com/embed.js?2'
  bind:this={editorRef}
  design={currentDesign}
  tools={currentTools}
  options={{ displayMode: 'email' }}
  onLoaded={(e) => console.log('Loaded', e.detail)}
  onDesignUpdated={(data) => console.log('Design updated', data)}
  onExportHtml={(data) => console.log('Exported HTML', data.html)}
/>


</main>

<style>
  main{
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;  
  }
  header{
    padding: 0.5rem 2rem;
    background-color: oklch(0.987 0.026 103.193);
  }
  .navigation{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000000;
  }
  
</style>
