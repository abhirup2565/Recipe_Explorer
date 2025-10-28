const Header =() =><h1>Header</h1>
const Footer =() =><h1>Footer</h1>
const Layout = ({children})=>{
    return(
        <>
        <Header></Header>
        {children}
        <Footer></Footer>
        </>
    )
}
export default Layout