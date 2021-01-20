import { Component, OnInit, ViewChild } from '@angular/core';
import { saveAs as importedSaveAs } from "file-saver";
import { FileService } from '../sharedServices/file.service';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.css']
})
export class UploadDownloadComponent implements OnInit {
  @ViewChild('resumeInput', { static: true }) resumeInput;
  @ViewChild('logoInput', { static: true }) logoInput;

  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  lstFileDetails: any;

  constructor(private service: FileService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.imageUrl = './assets/user.png';
    this.saveFileForm = this.formBuilder.group({
      UserName: ['', [Validators.required]]
    });
    this.service.getFiles().subscribe(result => {
      this.lstFileDetails = result;
      this.lstFileDetails.map(file => { file.Image = "https://localhost:44395/files/" + file.Image })
    })
  }
  refresh() {
    this.service.getFiles().subscribe(result => {
      this.lstFileDetails = result;
      this.lstFileDetails.map(file => { file.Image = "https://localhost:44395/files/" + file.Image })
    })
  }
  downloadDocFile(data) {
    const DocFileName = data.DocFile;
    var DocFile = DocFileName.slice(0, -5);
    this.service.downloadFile(DocFile).subscribe((data) => {
      importedSaveAs(data, DocFile)
    });
  }

  onSelectFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  downloadImage(data) {
    const ImageName = data.Image;
    var image = ImageName.slice(0, -4);
    var split = image.split("/");
    image = split[split.length - 1];
    this.service.downloadImage(image).subscribe((data) => {
      importedSaveAs(data, image)
    });
  }

  onExpSubmit() {

    if (this.saveFileForm.invalid) {
      return;
    }
    let formData = new FormData();
    formData.append('ImageUpload', this.logoInput.nativeElement.files[0]);
    formData.append('FileUpload', this.resumeInput.nativeElement.files[0]);
    formData.append('UserName', this.saveFileForm.value.UserName);
    this.service.AddFileDetails(formData).subscribe(result => {
      this.refresh();
    });
  }
}
