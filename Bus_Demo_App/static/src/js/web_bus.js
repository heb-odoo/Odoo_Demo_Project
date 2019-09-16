odoo.define('Bus_Demo_App.web_bus',function (require) {
"use strict";

var core = require('web.core');
var AbstractAction = require('web.AbstractAction');
var Widget = require('web.Widget');
var _t = core._t;
var WebClient = require('web.WebClient');
var session = require('web.session');
var QWeb = core.qweb;


var TeacherAction = AbstractAction.extend({
    template: "teacher_template",
   
    start: function(){
        this._super.apply(this, arguments);
        var counter = new Teacher(this);
        counter.appendTo(this.$el.find('#new_widget'));
    },
});

var StudentAction = AbstractAction.extend({
    template: "student_template",

    start: function(){
        this._super.apply(this, arguments);
        var counter2 = new Student(this);
        counter2.appendTo(this.$el.find('#student'));
    },
});

var Teacher = Widget.extend({
    template: 'teacher_widget',
    events: {
        'click .submit': '_onClickInSubmit',
    },
    init: function (parent) {
        this._super(parent);
    },
    _onClickInSubmit: function () {
        var resID = this.$('.quantity').val();
        var domain = [['name', '=', resID]];
        var self = this;
        return this._rpc({
                model: 'busdemoapp.bus',
                method: 'search_read',
                args: [domain],
                fields: ['name', 'image']
            })
            .then(function (result) {
                if(result.length){
                    return self._rpc({
                        model: 'busdemoapp.bus',
                        method: 'notify_student',
                        args: result
                    }).then(function (result) {
                        self.do_notify(_t("Success"), _t("Your image name request has been sent to students."));
                        self.$('.quantity').val("");
                    });
                }
                else {
                    self.do_warn(_t("Error"), _t("No data found."));
                }
            });
    },
});

var Student = Widget.extend({
    template: 'student_widget',
    events: {
        'click .ok': '_onClickOk',
        'click .Join': '_onClickJoin',
    },
    init: function (parent) {
        this._super(parent);
        this.image = null;
        core.bus.on('display_img', this, this._onImageDisplay);
    },
    willStart: function () {
        var self = this;
        var domain = [['partner_id', '=', session.partner_id]];
        return this._rpc({
                model: 'busdemoapp.students',
                method: 'search_read',
                args: [domain],
            })
            .then(function (result) {
                self.studentData = result;
            });
    },
    start: function () {
        this.$el.html(QWeb.render('student_widget', {
            studentData: this.studentData,
            
        }));
        return this._super.apply(this, arguments);
    },
    _onImageDisplay: function (imgData) {
            this.image = imgData;
            this.$el.html(QWeb.render('student_widget', {
                img:imgData,
                studentData: this.studentData,
            }));
    },

    _onClickOk: function () {
        var UserValue = this.$('.quantity2').val();
        if( UserValue == this.image.name){
                this.do_notify(_t("Success"), _t("Image name is correct."));
                self.$('.quantity2').val("");

        }else{
                this.do_warn(_t("Error"), _t("Name is not correct."));
        }
    },

    _onClickJoin: function (imgData) {
        this.do_notify(_t("Success"), _t("Thanks for Joining"));

        this.$el.html(QWeb.render('student_widget', {
            studentData: this.studentData,
            img: imgData,
        }));

        this._rpc({
            route: '/teacher/',
            params: {
                partner_id : session.partner_id,
            },
        }).then(function (data) {
    });
    },
});


WebClient.include({
        image_display: function(img){
            if(typeof(img)!=undefined){
                core.bus.trigger('display_img', img);
            }
        },
        show_application: function() {
            this.call('bus_service', 'startPolling');
            this.call('bus_service', 'onNotification', this, function(notifications) {
                console.log(notifications);
                _.each(notifications, (function(notification) {
                    if (notification[0][1] === 'image.data') {
                        this.image_display(notification[1]);
                    }
                }).bind(this));
            });
            return this._super.apply(this, arguments);
        },
    });

core.action_registry.add('teachertemp',TeacherAction);
core.action_registry.add('studenttemp',StudentAction);

return courseAction,courseAction2;

});