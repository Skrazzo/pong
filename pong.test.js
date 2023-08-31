const f = require('./js/functions');





console.clear();

test('Tests if function that calculates hit part of the paddle works correctly', () => {
    expect(f.calc_ball_coll_part(80, 200, 244)).toBe(2);
    expect(f.calc_ball_coll_part(80, 200, 214)).toBe(1);
    expect(f.calc_ball_coll_part(80, 200, 200)).toBe(1);
    expect(f.calc_ball_coll_part(80, 200, 260)).toBe(3);
});