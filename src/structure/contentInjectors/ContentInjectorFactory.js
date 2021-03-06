'use strict';

const _ = require('lodash-core');

const CONTENT_INJECTOR_CLASSES = {
    FIELD: require('./injectors/FieldContentInjector'),
    GROUP: require('./injectors/GroupContentInjector'),
    PAGE: require('./injectors/PageContentInjector'),
    PLUGIN: require('./injectors/PluginContentInjector')
};

let _singleton = null;

class ContentInjectorFactory {
    constructor (_dependencies) {
        if (_singleton) {
            return _singleton;
        }

        this._contentInjectors = {
            field: new CONTENT_INJECTOR_CLASSES.FIELD(_dependencies),
            group: new CONTENT_INJECTOR_CLASSES.GROUP(_dependencies),
            page: new CONTENT_INJECTOR_CLASSES.PAGE(_dependencies),
            plugin: new CONTENT_INJECTOR_CLASSES.PLUGIN(_dependencies)
        };

        _singleton = this;
    }

    getInjector (_contentInjectorName) {
        if (!_.has(this._contentInjectors, _contentInjectorName)) {
            throw new Error(`Invalid content injector -> ${_contentInjectorName}`);
        }

        return this._contentInjectors[_contentInjectorName];
    }
}

module.exports = ContentInjectorFactory;
