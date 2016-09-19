import {Component} from '@angular/core';
import {Camera} from 'ionic-native';
import {ToastController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
  
  // latest picture
  public base64Image: string;
  public imagestr: string;
  public test: string;



  constructor(private toastCtrl: ToastController) {
    this.imagestr = 'nothing yet';
    this.test = 'test123';
  }

  takePicture(){
    Camera.getPicture({
        quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            //sourceType : Camera.PictureSourceType.CAMERA,
            //allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 960,
            targetHeight: 640,
            saveToPhotoAlbum: false
    }).then((imageData) => {
        
      // imageData is a base64 encoded string
      // pad the imageData
      while (imageData.length % 4 > 0) {
        imageData += '=';
      }
      this.base64Image = "data:image/jpeg;base64," + imageData;
        //this.imagestr = base64;
    
  
// on image error:
}, (err) => {

        console.log(err);
        var msg = err;

        if (err === "cordova_not_available") {
          err = "This doesn't seem to be a mobile device, or camera is not accessible."
        }

        let toast = this.toastCtrl.create({
          message: err,
          //duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'X'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
    });
  }
}
