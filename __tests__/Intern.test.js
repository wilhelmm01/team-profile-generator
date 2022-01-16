
const Intern = require('../lib/Intern');

test('creates an Intern object', () => {
    const intern = new Intern('Matt', 100, 'matt14w@gmail.com', 'school');
    
    expect(intern.school) .toEqual(expect.any(String));
});

test(' intern school', () => {
    const intern = new Intern('Matt', 100, 'matt14w@gmail.com', 'school');
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('intern role ', () => {
    const intern = new Intern('Matt', 100, 'matt14w@gmail.com', 'school');

    expect(intern.getRole()).toEqual("Intern");
}); 