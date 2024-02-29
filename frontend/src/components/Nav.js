import { Button, Navbar } from "flowbite-react";

export default function NavbarWithCTAButton() {
  return (
    <Navbar fluid rounded id="my-nav">
       <Button className="bg-white text-#F89F1B border-solid border-2 border-#05182A">
          Lingua Span Assessment by Ahmed Nuhu
        </Button>
    </Navbar>
  );
}
