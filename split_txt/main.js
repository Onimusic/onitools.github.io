let FileSaver = require('file-saver');
let Bootstrap = require('bootstrap');

const alertModal = new Bootstrap.Modal(document.getElementById("alertModal"), {})

let chunks = document.getElementById("formChunks")
let file = document.getElementById("formFile");
let formButton = document.getElementById("formButton");

formButton.addEventListener("click", () => {
    // noinspection EqualityComparisonWithCoercionJS
    if (chunks.value == "" || file.value == "") {
        console.log(file.value)
        alertModal.show();
    } else {
        const reader = new FileReader();
        reader.onload = function () {
            let lines = this.result.split(/\r?\n/);
            let chunk_size = Math.ceil(lines.length / chunks.value);
            for (let i = 0; i < chunks.value; i++) {
                let j = i + 1;
                let chunk = lines.slice(i * chunk_size, (i + 1) * chunk_size);
                let blob = new Blob([chunk.join("\n")], {type: "text/plain;charset=utf-8"});
                let filename = (file.value).replace("C:\\fakepath\\", "") + "__pedaco-" + j + ".txt";
                FileSaver.saveAs(blob, filename);
            }
        };
        reader.readAsText(file.files[0]);
    }

});
