const styles = {
  backgroundColor: "var(--primary-500)",
  padding: "0.75rem 1rem",
  borderRadius: "var(--border-radius)",
  fontWeight: "700",
  fontSize: "larger",
}
const Logo = ({className}) => {
  return <span className={className} style={styles}>Job Tracking</span>
};

export default Logo;
