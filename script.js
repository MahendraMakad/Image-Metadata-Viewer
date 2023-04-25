
let preview = document.getElementById("preview");
let metadataList = document.getElementById("metadata");
let filedataList = document.getElementById('filedata');
const fileDataContainer = document.querySelector('.filedata-container');
const metaDataContainer = document.querySelector('.metadata-container');



function previewImage(event) {
  metadataList.innerHTML = "";
  filedataList.innerHTML = "";
  let file = event.target.files[0];
  let reader = new FileReader();
  let width, height;
  reader.onload = function (event) {
    let img = new Image();
    img.onload = function () {
      // display image size
      let imageSize = this.width + "x" + this.height;
      const label = document.querySelector('.upload-icon');
      label.style.border = 'none';
      label.style.background = 'none';
      label.style.height = "100px";
      addFileDataItem({ title: "Image Size:", value: imageSize });
      addMetaDataItem({ title: "Image Size:", value: imageSize });
    };
    img.src = event.target.result; // set the src attribute of the img element
    preview.src = img.src;
    document.getElementById('download-btn').style.display = 'inline-block';
  };
  reader.readAsDataURL(file);

  // Extract metadata using Exif-JS
  EXIF.getData(file, function () {
    let make = EXIF.getTag(this, "Make");
    let model = EXIF.getTag(this, "Model");
    let dateTime = EXIF.getTag(this, "DateTime");
    let gpsLatitude = EXIF.getTag(this, "GPSLatitude");
    let gpsLongitude = EXIF.getTag(this, "GPSLongitude");
    let gpsAltitude = EXIF.getTag(this, "GPSAltitude");

    // Display metadata
    metadataList.innerHTML = "";


    // Calculate size in MB
    // add file name
    let fileName = file.name;
    addFileDataItem({ title: "Name: ", value: fileName });
    addMetaDataItem({ title: "Name: ", value: fileName });

    let sizeOfImage = width + 'X' + height;
    let size = file.size / (1024 * 1024);
    if (size < 1) {
      size *= 1024;
      size = size.toFixed(2);
      addFileDataItem({ title: "Size: ", value: size + "KB" });
      addMetaDataItem({ title: "Size: ", value: size + "KB" });
    }
    else {
      size = size.toFixed(2);
      addFileDataItem({ title: "Size: ", value: size + "MB" });
      addMetaDataItem({ title: "Size: ", value: size + "MB" });
    }

    // display MIME type
    let fileType = file.type;
    addFileDataItem({ title: "MIME Type: ", value: fileType });
    addMetaDataItem({ title: "MIME Type: ", value: fileType });


    addMetaDataItem({ title: "Make: ", value: make });
    addMetaDataItem({ title: "Model: ", value: model });
    addMetaDataItem({ title: "Date/Time: ", value: dateTime });
    addMetaDataItem({ title: "GPS latitude: ", value: gpsLatitude });
    addMetaDataItem({ title: "GPS longitude: ", value: gpsLongitude });
    addMetaDataItem({ title: "GPS altitude: ", value: gpsAltitude });
    fileDataContainer.style.display = "block";
    metaDataContainer.style.display = "block";
  });
}

const addFileDataItem = (item) => {
  let newItem = document.createElement('tr');
  newItem.innerHTML = "<td>" + item.title + "</td>" + "<td>" + item.value + "</td>";
  filedataList.appendChild(newItem);
}

const addMetaDataItem = (item) => {
  let newItem = document.createElement('tr');
  newItem.innerHTML = "<td>" + item.title + "</td>" + "<td>" + item.value + "</td>";
  metadataList.appendChild(newItem);
}


