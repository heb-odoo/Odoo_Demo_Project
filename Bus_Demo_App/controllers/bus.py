	# -*- coding: utf-8 -*

from odoo.addons.bus.controllers.main import BusController
from odoo.http import request
from odoo import http



class TeacherBusController(BusController):
    # --------------------------
    # Extends BUS Controller Poll
    # --------------------------
    def _poll(self, dbname, channels, last, options):
        if request.session.uid:
            channels = list(channels)
            channels.append((request.db, 'image.data', request.env.user.partner_id.id))
        return super(TeacherBusController, self)._poll(dbname, channels, last, options)

    @http.route('/teacher/',type='json', auth='public')
    def student(self,partner_id):
    	enroll = request.env['busdemoapp.students'].sudo().add_member(partner_id)
    	print(partner_id)
    	return bool(enroll)
        


