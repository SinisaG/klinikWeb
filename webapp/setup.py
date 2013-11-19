import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

requires = [
    'pyramid>=1.5a2',
    'pyramid_mako>=0.3.1',
    'pyramid_debugtoolbar',
    'formencode',
    'pastescript',
    'pastedeploy',
    'mako',
    'babel',
    'lingua',
    'beaker',
    'paste',
    'simplejson',
    'dnspython',
    'pyDNS',
    'turbomail',
    'uuid',
    'pyramid_beaker',
    'pyramid_exclog',
    'beautifulsoup',
    'unidecode',
    "dogpile.cache>=0.4.1",
    "redis",
    "httplib2",
    "markdown",
    "smartypants",
    "weberror",
    'hnc>=0.1.48dev',
    'hnc_forms_ext>=0.0.04dev'
    ]

setup(name='klinik',
      version='0.0',
      description='klinik',
      long_description='Lots things',
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='',
      author_email='',
      url='',
      keywords='web pyramid pylons',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="klinik",
      message_extractors = {
            'klinik': [
                ('**.py', 'lingua_python', None),
                ('templates/**.html', 'mako', {'input_encoding': 'utf-8'}),
                ('templates/**.js', 'mako', {'input_encoding': 'utf-8'})
                ]
             },
      entry_points="""\
      [paste.app_factory]
      main = klinik:main
      """,
      )
