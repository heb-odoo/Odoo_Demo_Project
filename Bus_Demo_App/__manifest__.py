{
    'name': "BusDemoApp",
    'version': '1.0',
    #'depends': ['base'],
    'author': "hemali",
    'category': 'Tools',
    'depends': ['base', 'bus'],
    'description': """,
    Image for student
    """,  
    # data files always loaded at installation
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/busDemo.xml',
        'views/assets.xml',

    ],
    'qweb' : ['static/src/xml/widget_template.xml'],

    # 'application': True,
}