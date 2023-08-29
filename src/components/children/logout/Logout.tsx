import Link from 'next/link'

const Logout = (): JSX.Element => {
  return (
    <div
      style={{
        flexDirection: 'column',
        color: 'white',
        fontSize: '2rem',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div>Sign Off Succesfully</div>
      <div>
        <Link href={'https://grow.sunlight.is/'} passHref>
          Press here to Return to Sunlight
        </Link>
      </div>
    </div>
  )
}

export default Logout
