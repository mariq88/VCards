var EmployeeView = function(employee) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.watchPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' +position.coords.longitude);           

            },
            function(error) {
                alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
            },
        {
                    enableHighAccuracy: true,
                    maximumAge: 1000}
        );
        return false;
    };

    this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: app.currentEmployee.firstName, familyName:  app.currentEmployee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', app.currentEmployee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', app.currentEmployee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    };

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

    this.initialize();

}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());