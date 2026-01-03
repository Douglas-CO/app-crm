import { useUiStore } from '@/store/useUiStore';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { LoadingOverlayStyle } from './loadingoverlay.style';

const LoadingOverlay = () => {
  const isGlobalLoading = useUiStore(state => state.isGlobalLoading);

  if (!isGlobalLoading) return null;

  return (
    <View style={LoadingOverlayStyle.overlay}>
      <ActivityIndicator size="large" color="#6a0dad" />
    </View>
  );
};


export default LoadingOverlay;
