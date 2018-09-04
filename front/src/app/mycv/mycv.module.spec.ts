import { MyCVModule } from './mycv.module';

describe('MycvModule', () => {
  let mycvModule: MyCVModule;

  beforeEach(() => {
    mycvModule = new MyCVModule();
  });

  it('should create an instance', () => {
    expect(mycvModule).toBeTruthy();
  });
});
