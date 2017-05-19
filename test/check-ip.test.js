const assert = require('chai').assert;
const checkIp = require('../check-ip');

describe('checkIp Unit Tests', function(){

  // originalIp Test
  describe('originalIp Test', function(){
    let thisUnitTest = checkIp('1.2.3.4');
    it('should return the original IP address', function(){
      assert.equal(thisUnitTest.originalIp, '1.2.3.4');
    });
  });
  
  // boiledIp Test
  describe('boiledIp Test', function(){
    let thisUnitTest = checkIp('10.020.30.40');
    it('should return the boiled IP address', function(){
      assert.equal(thisUnitTest.boiledIp, '10.20.30.40');
    });
  });

  // isValid Tests
  describe('isValid true Test', function(){
    let thisUnitTest = checkIp('10.10.10.10');
    it('should return true', function(){
      assert.equal(thisUnitTest.isValid, true);
    });
  });
  describe('isValid false Test', function(){
    let thisUnitTest = checkIp('256.256.256.256');
    it('should return false', function(){
      assert.equal(thisUnitTest.isValid, false);
    });
  });

  // isBogon Tests
  describe('isBogon true Test', function(){
    let thisUnitTest = checkIp('10.0.0.1');
    it('should return true', function(){
      assert.equal(thisUnitTest.isBogon, true);
    });
  });
  describe('isBogon false Test', function(){
    let thisUnitTest = checkIp('8.8.8.8');
    it('should return false', function(){
      assert.equal(thisUnitTest.isBogon, false);
    });
  });

  // isApipa Tests
  describe('isApipa true Test', function(){
    let thisUnitTest = checkIp('169.254.0.1');
    it('should return true', function(){
      assert.equal(thisUnitTest.isApipa, true);
    });
  });
  describe('isApipa false Test', function(){
    let thisUnitTest = checkIp('8.8.8.8');
    it('should return false', function(){
      assert.equal(thisUnitTest.isApipa, false);
    });
  });

  // isMulticast Tests
  describe('isMulticast true Test', function(){
    let thisUnitTest = checkIp('224.0.0.1');
    it('should return true', function(){
      assert.equal(thisUnitTest.isMulticast, true);
    });
  });
  describe('isMulticast false Test', function(){
    let thisUnitTest = checkIp('8.8.8.8');
    it('should return false', function(){
      assert.equal(thisUnitTest.isMulticast, false);
    });
  });

  // isRfc1918 Tests
  describe('isRfc1918 true Test', function(){
    let thisUnitTest = checkIp('172.16.0.1');
    it('should return true', function(){
      assert.equal(thisUnitTest.isRfc1918, true);
    });
  });
  describe('isRfc1918 false Test', function(){
    let thisUnitTest = checkIp('8.8.8.8');
    it('should return false', function(){
      assert.equal(thisUnitTest.isRfc1918, false);
    });
  });

  // isPublicIp Tests
  describe('isPublicIp true Test', function(){
        let thisUnitTest = checkIp('8.8.8.8');
    it('should return true', function(){
      assert.equal(thisUnitTest.isPublicIp, true);
    });
  });
  describe('isPublicIp false Test', function(){
        let thisUnitTest = checkIp('192.168.0.1');
    it('should return false', function(){
      assert.equal(thisUnitTest.isPublicIp, false);
    });
  });

});
