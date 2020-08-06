const lib = require('../lib');

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
            lib.applyDiscount({ customerId: 1, totalPrice: 10 })
        });
    });

    it('should return user object if valid username is passed', () => {
        const result = lib.registerUser('Simona');
        expect(result).toMatchObject({username: 'Simona'});
        expect(result.id).toBeGreaterThan(0);
    });
});