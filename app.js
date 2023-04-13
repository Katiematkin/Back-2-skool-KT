console.log("Hello Back to School!");
let viz;
//1. Create a variable to store the vizContainer
//2. Create a variable to store the Dashboard options
//3. Create a variable to store the URL - if it doesn't load might need to specify height and width

const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "900px",
  width: "1400px",
};
const url =
  "https://public.tableau.com/views/EmbeddingDashboard_16813782941630/Dashboard1?:language=en-GB&:display_count=n&:origin=viz_share_link";
const exportpdfbutton = document.getElementById("exportPDF");
const exportpowerpointbutton = document.getElementById("exportPowerPoint");
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
initViz();
document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportpowerpointbutton.addEventListener("click", exportPowerPointfunction);
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportPowerPointfunction() {
  viz.showExportPowerPointDialog();
}
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[0];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered 😝"));
}
