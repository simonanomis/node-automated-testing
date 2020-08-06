const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });  
    
    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    }); 
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Simona');
        expect(result).toMatch(/Simona/);
        expect(result).toContain('Simona');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        //too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //ideal way
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));

    });
});

describe('getProduct', () => {
    it('should return product with given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({
            id: 1,
            price: 10
        }); //equals and tests all properties of the objects
        expect(result).toMatchObject({
            id: 1,
            price: 10
        }); //tests only given properties
        expect(result).toHaveProperty(
            'id', 1);
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const wrongInputs = [null, undefined, NaN, '', 0, false];
        wrongInputs.forEach(wrongInput => {
            expect(() => {lib.registerUser(wrongInput)}).toThrow();
        });
    });

    it('should return user object if valid username is passed', () => {
        const result = lib.registerUser('Simona');
        expect(result).toMatchObject({username: 'Simona'});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return {id: customerId, points: 20}
        }
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send email to the customer', () => {

        db.getCustomerSync = jest.fn().mockReturnValue( {email: 'a'});
        mail.send = jest.fn()
        
        lib.notifyCustomer( {customerId: 1 });
        //expect(mail.send).toHaveBeenCalled();
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a'); //check passing arguments like mail
        expect(mail.send.mock.calls[0][1]).toMatch(/order/); //and message where order is in the sentence

    });
});