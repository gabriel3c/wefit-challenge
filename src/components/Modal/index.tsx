import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  Modal as ModalBase,
  Platform,
} from "react-native";

import styled from "styled-components/native";

import Typography from "../Typography";

import Draggable from "@/assets/images/Draggable.svg";

type PropsModal = {
  title: string;
  titleColored?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  children: ReactNode;
};

const Container = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
`;

const ModalWrapper = styled.Pressable`
  background-color: white;
  margin-top: auto;
  padding: 16px;
  border-radius: 20px;
  z-index: 10;
`;

const DraggableWrapper = styled.Pressable`
  width: "max-content";
  padding: 8px 24px;
  margin-bottom: 16px;
  align-self: center;
  align-items: center;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export default function Modal({ title, open, setOpen, children }: PropsModal) {
  const closeModal = () => setOpen((prev) => !prev);

  const handleStopPropagation = (e: GestureResponderEvent) => {
    e.stopPropagation();
    Keyboard.dismiss();
  };

  return (
    <ModalBase
      animationType="fade"
      visible={open}
      onRequestClose={closeModal}
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Container onPress={closeModal}>
          <ModalWrapper onPress={handleStopPropagation}>
            {title && (
              <>
                <DraggableWrapper onPress={closeModal}>
                  <Draggable />
                </DraggableWrapper>
                <ModalHeader>
                  <Typography fontSize="16px">{title}</Typography>
                </ModalHeader>
              </>
            )}

            {children}
          </ModalWrapper>
        </Container>
      </KeyboardAvoidingView>
    </ModalBase>
  );
}
