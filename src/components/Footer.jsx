function Footer() {
  return (
    <div className="fixed bottom-0 flex w-full justify-around  gap-3 bg-slate-950 text-sm  tracking-wider text-neutral-100">
      <span>
        <a href="#">Privacy</a>
      </span>

      <span>
        <a href="#">Terms&condition</a>
      </span>

      <span>Copyright© {new Date().getFullYear()}</span>
    </div>
  );
}

export default Footer;
