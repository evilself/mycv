import { AllCVModule } from './allcv.module';

describe('AllcvModule', () => {
  let allcvModule: AllCVModule;

  beforeEach(() => {
    allcvModule = new AllCVModule();
  });

  it('should create an instance', () => {
    expect(allcvModule).toBeTruthy();
  });
});
