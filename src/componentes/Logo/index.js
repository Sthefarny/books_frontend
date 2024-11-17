import styled from 'styled-components'
    import logo from '../../imagens/logo.png'

    const LogoContainer=styled.div`
        display: flex;
        font-size: 30px;
    `
    const LogoImage = styled.img`
        width: 90px; 
        height: auto; 
        margin-right: 10px; 
    `

    function Logo() {
        return (
            <LogoContainer>
                <LogoImage
                src={logo}
                 alt='logo' 
                 />
                <p><strong>MySpace</strong></p>
            </LogoContainer>
        )
    }

    export default Logo