'use strict';

const _ = require('lodash-core');
const labeler = require('../../../helpers/labeler');

class _ContentInjectorInterface {
    _generateContent (_type, _value, _plainTextWrapper) {
        if (_type === 'text') {
            return $(`<${_plainTextWrapper}>${_value}</${_plainTextWrapper}>`).addClass(labeler.get('CLASS_INJECTED_CONTENT_TEXT'));
        }

        if (_type === 'html') {
            return $(_value).addClass(labeler.get('CLASS_INJECTED_CONTENT_HTML'));
        }

        if (_type === 'img') {
            const _imgSrc = _value.indexOf('http') === -1 ? `data:image/png;base64, ${_value}` : _value;

            return $(`<img src="${_imgSrc}"></div>`);
        }
    }

    _generateWrapperDiv (_id) {
        const _$div = $('<div/>');

        if (_id) {
            _$div.attr('id', _id);
        }

        return _$div;
    }

    _isCustomContent (_type) {
        return _type === 'html';
    }

    static _isValidContent (_content) {
        return _content !== '' && !_.isNil(_content);
    }
}

module.exports = _ContentInjectorInterface;
