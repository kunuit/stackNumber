import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {Theme} from '@common/theme';

export const NumberCardLoader = props => (
  <ContentLoader
    speed={2}
    width={340}
    height={108}
    opacity={0.7}
    viewBox="0 0 340 108"
    backgroundColor={Theme.colors.lineBorder}
    foregroundColor={Theme.colors.primary}
    {...props}>
    <Rect x="5" y="11" rx="0" ry="0" width="60" height="71" />
    <Rect x="81" y="17" rx="0" ry="0" width="77" height="11" />
    <Rect x="83" y="70" rx="0" ry="0" width="103" height="8" />
    <Rect x="166" y="17" rx="0" ry="0" width="77" height="11" />
    <Rect x="82" y="45" rx="0" ry="0" width="77" height="11" />
  </ContentLoader>
);
