import { authSagas } from 'containers/auth';


export default function* sagas() {
  yield [
    ...authSagas,
  ];
}
