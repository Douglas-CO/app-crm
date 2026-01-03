import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { SingleTableBoxSceneStyles } from './single-table-box.style';

export type SingleTableBoxSceneProps = {
  title: string;
  createPageUrl?: string; // nombre de pantalla
  children: React.ReactNode;
  showCreateBtn?: boolean;

  createBtnText?: string;
  onClickCreateBtn?: () => void;

  showCustomBtns?: boolean;
  customBtns?: React.ReactNode;

  showCustomHeader?: boolean;
  customHeader?: React.ReactNode;

  showImportExportBtns?: boolean;
  importExportBtns?: React.ReactNode;

  isMainTableStates?: boolean;
};

const SingleTableBoxScene: React.FC<SingleTableBoxSceneProps> = ({
  title,
  createPageUrl,
  children,
  showCreateBtn = true,
  createBtnText = 'Crear',
  onClickCreateBtn,

  showCustomBtns = false,
  customBtns,

  showCustomHeader = false,
  customHeader,

  showImportExportBtns = false,
  importExportBtns,

}) => {
  const navigation = useNavigation();
  const styles = SingleTableBoxSceneStyles();

  const handleCreateBtn = () => {
    if (onClickCreateBtn) {
      onClickCreateBtn();
    } else if (createPageUrl) {
      navigation.navigate(createPageUrl as never);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {showCustomHeader && customHeader ? (
          <View>{customHeader}</View>
        ) : (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {showCreateBtn && (
              <TouchableOpacity onPress={handleCreateBtn} style={styles.button}>
                <Text style={styles.buttonText}>{createBtnText}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {showCustomBtns && customBtns && (
          <View style={styles.extraBtns}>{customBtns}</View>
        )}

        {showImportExportBtns && importExportBtns && (
          <View style={styles.extraBtns}>{importExportBtns}</View>
        )}

        <View style={styles.card}>
          {children}
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleTableBoxScene;
