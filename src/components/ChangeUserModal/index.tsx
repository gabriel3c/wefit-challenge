import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { Button, TextInput } from "react-native-paper";
import Column from "../Column";
import Modal from "../Modal";
import Row from "../Row";
import Typography from "../Typography";

import useRepositories from "@/src/hooks/useRepositories";

type FormProps = {
  username: string;
};

type ChangeUserProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const userSchema = object({
  username: string().required("Informe o usuário"),
});

export default function ChangeUserModal({ setOpen }: ChangeUserProps) {
  const [loading, setLoading] = useState(false);
  const { githubUser, handleGithubRepos } = useRepositories();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: { username: githubUser },
  });

  const handleChangeUser = async ({ username }: FormProps) => {
    setLoading(true);
    try {
      await handleGithubRepos({ username });
    } catch (error) {
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Modal title="Alterar usuário selecionado" open setOpen={setOpen}>
      <Column gap={12}>
        <Column>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  autoCapitalize="none"
                  error={!!errors?.username}
                  onSubmitEditing={handleSubmit(handleChangeUser)}
                  label="Nome do usuário"
                  value={field.value}
                  onChangeText={field.onChange}
                  style={{ backgroundColor: "#0000000F" }}
                  activeUnderlineColor="#1976D2"
                />
                {errors?.username && (
                  <Typography color="#b2443c">
                    {errors.username.message}
                  </Typography>
                )}
              </>
            )}
          />
        </Column>

        <Row>
          <Button
            contentStyle={{ padding: 4 }}
            style={{ borderRadius: 4, flex: 1 }}
            textColor="#1976D2"
            onPress={() => setOpen(false)}
          >
            CANCELAR
          </Button>
          <Button
            loading={loading}
            style={{ borderRadius: 4, flex: 1 }}
            contentStyle={{ padding: 4 }}
            mode="contained"
            buttonColor="#1976D2"
            onPress={handleSubmit(handleChangeUser)}
          >
            SALVAR
          </Button>
        </Row>
      </Column>
    </Modal>
  );
}
