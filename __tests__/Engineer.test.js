
const Engineer = require('../lib/Engineer');

  
test('engineer object', () => {
    const engineer = new Engineer('Matt', 100, 'Matt14w@gmail.com', 'wilhelmm01');
    
    expect(engineer.github) .toEqual(expect.any(String));
});

test('engineer github', () => {
    const engineer = new Engineer('Matt', 100, 'Matt14w@gmail.com', 'wilhelmm01');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});


test('role', () => {
    const engineer = new Engineer('Matt', 100, 'Matt14w@gmail.com', 'wilhelmm01');

    expect(engineer.getRole()).toEqual("Engineer");
});