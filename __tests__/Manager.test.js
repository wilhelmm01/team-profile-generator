 
const Manager = require('../lib/Manager');


test('creates an Manager object', () => {
    const manager = new Manager('Matt', 100, 'matt14w@gmail.com', 100);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('validate manager role', () => {
    const manager = new Manager('Matt', 100, 'Matt14w@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 