import { useEffect, useState } from 'react';

import { Input } from '../Input';
import { Rating } from '../Rating';
import { SubmitButton } from '../SubmitButton';
import { ProgressButton } from '../ProgressButton';

import { locationsApi, mockApi } from '../../services/api';
import { parseDateToPTBR, parseDateToUS } from '../../util/FormateDate';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  IoMenuOutline,
  IoPersonCircleOutline,
  IoEllipsisVerticalSharp,
  IoChevronForwardOutline
} from 'react-icons/io5'
import {
  Container,
  Header,
  Content,
  TalkHeader,
  BubbleIncome,
  BubbleOutcome
} from './styles';

interface FormValues {
  email: string;
  name: string;
  idState: number;
  idCity: number;
  birthday: string;
  rating: number;
}

interface FormValuesErrors {
  email?: string;
  name?: string;
  idState?: string;
  idCity?: string;
  birthday?: string;
  rating?: string;
}

interface FormsElements {
  email: boolean;
  city: boolean;
  birthday: boolean;
  rating: boolean;
}

interface StatesProps {
  id: number;
  nome: string;
  sigla: string;
}

interface CitiesProps {
  id: number;
  nome: string;
}

interface ActionsForm {
  setSubmitting: (data: boolean) => void;
}

export const Chat = () => {
  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    name: Yup
      .string()
      .required('Nome e sobrenome obrigatórios'),
    idState: Yup
      .number()
      .required('Estado obrigatório')
      .positive()
      .integer(),
    idCity: Yup
      .number()
      .required('Cidade obrigatória')
      .positive()
      .integer(),
    birthday: Yup
      .date()
      .transform(parseDateToUS)
      .max(Intl.DateTimeFormat('en-US').format(new Date()), 'Data de nascimento não pode ser superior a atual.'),
    rating: Yup
      .number()
      .required('Avaliação obrigatória')
      .positive()
      .integer(),
  });

  const [states, setStates] = useState<StatesProps[]>([]);
  const [cities, setCities] = useState<CitiesProps[]>([]);
  const [state, setState] = useState(0);
  const [cityLoading, setCityLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [elements, setElements] = useState<FormsElements>({
    email: false,
    city: false,
    birthday: false,
    rating: false,
  });
  const [yupErros, setYupErros] = useState<FormValuesErrors>({})

  const initialValues: FormValues = { email: '', name: '', idState: 0, idCity: 0, birthday: '', rating: 0 };

  useEffect(() => {
    const getStates = async () => {
      try {
        await locationsApi.get('estados')
          .then((response) => {
            setStates(response.data);
          });
      } catch (err) {
        alert(err);
      }
    }

    getStates();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      try {
        setCityLoading(true);
        await locationsApi.get(`estados/${state}/municipios`)
          .then((response) => {
            setCities(response.data);
          });
      } catch (err) {
        alert(err);
      } finally {
        setCityLoading(false);
      }
    }

    getCities();
  }, [state]);

  const handleShowElements = (element: string, err: string | undefined, value: string | number): void => {

    if (err || !value || value === '' || value === 0) {
      return;
    }

    setElements((elements: FormsElements) => ({
      ...elements,
      [element]: true,
    }));
  }

  const handleSubmit = async (values: FormValues, actions: ActionsForm): Promise<void> => {
    try {
      setFormLoading(true);
      actions.setSubmitting(false);
  
      const data = await validationSchema.validate(values);

      Object.assign(data, {
        birthday: parseDateToPTBR(data.birthday),
      });

      setYupErros({});

      await mockApi.post('user', data)
        .then((response) => {
          if (response.status === 201) {
            alert("Dados enviados com sucesso!");
          } else {
            throw new Error('Erro ao enviar os dados.');
          }
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setYupErros((yupErros: FormValuesErrors) => ({
          ...yupErros,
          [err.params.path]: err.message,
        }));
      } else {
        alert(err);
      }
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <IoMenuOutline color="#fff" />
      </Header>
      <TalkHeader>
        <IoPersonCircleOutline />
        <p>Tiago</p>
        <IoEllipsisVerticalSharp className="MenuTalkHeader" />
      </TalkHeader>
      <Content>

        <Formik
          initialValues={initialValues}
          validate={values => {
            const errors: FormValuesErrors = {};
            if (!values.email) {
              errors.email = 'Campo obrigatório.';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'E-mail inválido';
            }

            if (!values.birthday) {
              errors.birthday = 'Campo obrigatório.';
            } else if (
              !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(values.birthday)
            ) {
              errors.birthday = 'Data inválida.';
            }

            if (!values.name) {
              errors.name = 'Campo obrigatório.';
            }

            if (values.idState === 0 || !values.idState) {
              errors.idState = 'Campo obrigatório.';
            }


            if (values.idCity === 0 || !values.idCity) {
              errors.idCity = 'Campo obrigatório.';
            }

            if (values.rating === 0) {
              errors.rating = 'Campo obrigatório.';
            }

            return errors;
          }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <BubbleIncome>
                <div className="talktext">
                  <p>Olá, meu nome é Tiago, tudo bem? Para começarmos, preciso saber seu nome.</p>
                </div>
              </BubbleIncome>
              <BubbleOutcome error={errors.name}>
                <div className="talktext">
                  <Input
                    name="name"
                    type="name"
                    handleChange={handleChange}
                    value={values.name}
                    placeholder="Nome e sobrenome"
                    errors={errors.name || yupErros.name}
                  />

                  <ProgressButton
                    disabled={errors.name || yupErros.name || !values.name ? true : false}
                    onClick={() => handleShowElements('city', errors.name, values.name)}
                  />
                </div>
              </BubbleOutcome>

              {elements.city && (
                <>
                  <BubbleIncome>
                    <div className="talktext">
                      <p>Que satisfação, {values.name}. Agora que sei o seu nome, qual a cidade e estado que você mora?</p>
                    </div>
                  </BubbleIncome>

                  <BubbleOutcome error={(errors.idState) || (errors.idCity)}>
                    <div className="talktext">
                      <div className="select">
                        <select
                          name="idState"
                          onChange={(e) => {
                            Object.assign(values, {
                              idCity: '',
                            });
                            setState(Number(e.target.value));
                            handleChange(e);
                          }}
                          value={values.idState}
                          placeholder="Estado"
                        >
                          <option value="">Selecione</option>
                          {states.map(state => (
                            <option key={state.id} value={Number(state.id)}>
                              {`${state.sigla} - ${state.nome}`}
                            </option>
                          ))}
                        </select>
                        {errors.idState || yupErros.idState ? (
                          <p className="inputError">{errors.idState}</p>
                        ) : null}
                      </div>

                      <div className="select">
                        <select
                          name="idCity"
                          className="city"
                          onChange={handleChange}
                          value={values.idCity}
                          placeholder="Cidade"
                          disabled={cityLoading}
                        >
                          <option value="">{cityLoading ? 'Carregando...' : 'Selecione'}</option>
                          {cities.map(city => (
                            <option key={city.id} value={Number(city.id)}>
                              {city.nome}
                            </option>
                          ))}
                        </select>
                        {errors.idCity || yupErros.idCity ? (
                          <p className="inputError">{errors.idCity}</p>
                        ) : null}
                      </div>

                      <ProgressButton
                        disabled={errors.idCity || yupErros.idCity || !values.idCity ? true : false}
                        onClick={() => handleShowElements('birthday', errors.idCity, values.idCity)}
                      />
                    </div>
                  </BubbleOutcome>
                </>
              )}

              {elements.birthday && (
                <>
                  <BubbleIncome>
                    <div className="talktext">
                      <p>Legal, agora que sabemos sua cidade e estado, quando foi que você nasceu?</p>
                    </div>
                  </BubbleIncome>

                  <BubbleOutcome error={errors.name}>
                    <div className="talktext">
                      <Input
                        name="birthday"
                        type="birthday"
                        handleChange={handleChange}
                        value={values.birthday}
                        placeholder="ex: 12/12/2021"
                        errors={errors.birthday || yupErros.birthday}
                      />

                      <ProgressButton
                        disabled={errors.birthday || yupErros.birthday || !values.birthday ? true : false}
                        onClick={() => handleShowElements('email', errors.birthday, values.birthday)}
                      />
                    </div>
                  </BubbleOutcome>
                </>
              )}

              {elements.email && (
                <>
                  <BubbleIncome>
                    <div className="talktext">
                      <p>Agora me fala teu e-mail, por gentileza.</p>
                    </div>
                  </BubbleIncome>

                  <BubbleOutcome error={errors.name}>
                    <div className="talktext">
                      <Input
                        name="email"
                        type="text"
                        handleChange={handleChange}
                        value={values.email}
                        placeholder="E-mail"
                        errors={errors.email || yupErros.email}
                      />

                      <ProgressButton
                        disabled={errors.email || yupErros.email || !values.email ? true : false}
                        onClick={() => handleShowElements('rating', errors.email, values.email)}
                      />
                    </div>
                  </BubbleOutcome>
                </>
              )}

              {elements.rating && (
                <>
                  <BubbleIncome>
                    <div className="talktext">
                      <p>Você finalizou o teste, faça uma avaliação sobre o processo que realizou para chegar até aqui. Nós agradecemos!</p>
                    </div>
                  </BubbleIncome>

                  <BubbleOutcome error={errors.name}>
                    <div className="talktextRating">
                      <Rating error={errors.rating || yupErros.rating} onChange={handleChange} />
                    </div>
                  </BubbleOutcome>

                  {values.rating > 0 && (
                    <SubmitButton isSubmitting={isSubmitting}>
                      {formLoading ? 'Carregando...' : 'Salvar'}
                    </SubmitButton>
                  )}
                </>
              )}
            </form>
          )}
        </Formik>
      </Content>
    </Container>
  );
}