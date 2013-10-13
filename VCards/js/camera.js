var app = app || {};

(function(a) {
    var pictureSource = null;
    var destinationType = null;
    a.pictures = {
        init:function() {
             pictureSource = navigator.camera.PictureSourceType;
             destinationType = navigator.camera.DestinationType;
        },
        close: function() {            
        },
        get:function() {            
            
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                destinationType: destinationType.DATA_URL });
            
            function onSuccess(imageData) {
            var image = document.getElementById('smallImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }
            
            function onFail(message) {
            alert('Failed because: ' + message);
        }
        }
    };
}(app));