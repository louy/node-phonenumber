var expect = require('chai').expect,
    phone = require('../lib/index.js'),
    phone_util = phone.PhoneNumberUtil.getInstance();

describe('#parse', function(){
    it('works', function(){
        var fn = function() {
            phone_util.parse('123123123', 'GB');
        };
        expect(fn).to.not.throw();
    });

    it('throws an error with invalid numbers', function(){
        var fn = function() {
            phone_util.parse(null);
        };
        expect(fn).to.throw();
        
        var fn2 = function() {
            phone_util.parse('213sad');
        };
        expect(fn2).to.throw();
        
        var fn3 = function() {
            phone_util.parse('4324+323');
        };
        expect(fn3).to.throw();
    });
});
    
describe('#format', function(){
    it('parse MY phone number format', function(){
        var number = phone_util.parse('0139348815','MY');
        expect(phone_util.format(number, phone.PhoneNumberFormat.INTERNATIONAL)).to.equal('+60 13-934 8815');
    });

    it('parse UK phone number format', function(){
        var number = phone_util.parse('0845 313 66 66','GB');
        expect(phone_util.format(number, phone.PhoneNumberFormat.INTERNATIONAL)).to.equal('+44 845 313 6666');
    });

    it('parse an international phone number', function(){
        var number = phone_util.parse('0012422342353','GB');
        expect(phone_util.format(number, phone.PhoneNumberFormat.INTERNATIONAL)).to.equal('+1 242-234-2353');
    });

    it('format in RFC3966', function(){
        var number = phone_util.parse('7239048346','TR');
        expect(phone_util.format(number, phone.PhoneNumberFormat.RFC3966)).to.equal('tel:+90-7239048346');
    });

    it('format in E164', function(){
        var number = phone_util.parse('5070000000','TR');
        expect(phone_util.format(number, phone.PhoneNumberFormat.E164)).to.equal('+905070000000');
    });

    it('format to national', function(){
        var number = phone_util.parse('+90 507 000 0000');
        expect(phone_util.format(number, phone.PhoneNumberFormat.NATIONAL)).to.equal('0507 000 0000');
    });
});

describe('#format', function(){
    it('validate number', function() {
        expect(phone_util.isValidNumber(
            phone_util.parse('23907','GB')
        )).to.equal(false);

        expect(phone_util.isValidNumber(
            phone_util.parse('53453455','GB')
        )).to.equal(false);

        expect(phone_util.isValidNumber(
            phone_util.parse('8453136666','GB')
        )).to.equal(true);
    });
});
