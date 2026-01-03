import { CustomScrollView } from '@/components';
import React from 'react';
import { View } from 'react-native';
import CreateBalanceEntryPage from '../modules/BalanceEntry/pages/form/CreateBalanceEntryPage';

export default function BalanceEntry() {
  return (
    <View>
      <CustomScrollView>
       <CreateBalanceEntryPage />
      </CustomScrollView>
    </View>
  );
}
