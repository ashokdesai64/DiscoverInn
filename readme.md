Things to change to make the screens visible.

node_modules > react-native > Libraries > Images > RCTUIImageViewAnimated.m search for if (_currentFrame)
add the following else block to the if block as below
 if (_currentFrame) {
    layer.contentsScale = self.animatedImageScale;
    layer.contents = (__bridge id)_currentFrame.CGImage;
  } else {
    [super displayLayer:layer];
  }