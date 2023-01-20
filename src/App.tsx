import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import FormInput from './components/FormInput';
import {
  IEncryption,
  encrypt,
  decrypt
} from './utils/encryption'

interface IEncryptionExtendedOutput extends IEncryption {
  output?: string
}
const App: React.FC = (): React.ReactElement => {
  const initailData: IEncryptionExtendedOutput = {
    input: '',
    code: '',
    interationCount: 0,
    keySize: 0,
    passphrase: '',
    iv: '',
    salt: '',
    output: ''
  }
  const [data, setData] = React.useState(initailData)

  const handleSetData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const id: string = event.target.id
    const value: string | number = event.target.value

    setData({ ...data, [id]: value })
  }

  const handleEncryption = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const id: string = event.currentTarget.id
    if (id === 'encrypt') {
      const encrypted = encrypt(data)
      setData({ ...data, output: encrypted })
    } else if (id === 'decrypt') {
      const decrypted = decrypt(data)
      setData({ ...data, output: decrypted })
    }
  }

  return (
    <div className="App">
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          pt: 3,
          pb: 3,
          mb: 1,
          justifyContent: 'center',
          backgroundColor: '#1976d2',
          maxWidth: '100%'
        }}
      >
        <Typography
        component="h1"
        sx={{
          color: '#fff'
        }}
        >
          Advanced Encryption Standard(AES)
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <FormInput
            id="code"
            onChange={handleSetData}
            value={data.code}
            label="Code"
          />
          <FormInput
            id="interationCount"
            onChange={handleSetData}
            value={data.interationCount}
            label="Interation Count"
            type="number"
          />
          <FormInput
            id="keySize"
            label="Key Size"
            type="number"
            onChange={handleSetData}
            value={data.keySize}
          />
          <FormInput
            id="passphrase"
            label="Passphrase"
            onChange={handleSetData}
            value={data.passphrase}
          />
          <FormInput
            id="iv"
            label="iv"
            onChange={handleSetData}
            value={data.iv}
          />
          <FormInput
            id="salt"
            label="salt"
            onChange={handleSetData}
            value={data.salt}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
          }}
        >
          <FormInput
            id="input"
            label="Input (Plain Text / Encrypted Text)"
            multiline
            rows={7.25}
            onChange={handleSetData}
            value={data.input}
          />
          <FormInput
            id="output"
            label="Output (Plain Text / Encrypted Text)"
            multiline
            rows={7.25}
            onChange={handleSetData}
            value={data.output}
          />
        </Box>

      </Container>
      <Container
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "50%",
            p: 1
          }}
        >
          <Button
            id="encrypt"
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleEncryption}
          >
            Encrypt
          </Button>
        </Box>
        <Box
          sx={{
            width: "50%",
            p: 1
          }}
        >
          <Button
            id="decrypt"
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleEncryption}
          >
            Decrypt
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
