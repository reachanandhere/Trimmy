import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [longUrl, setLongUrl] = React.useState("");
    const navigate = useNavigate()
    const handleSubmit= (e) => {
        e.preventDefault();
        if(longUrl) navigate(`/auth?createNew=${longUrl}`)
    } 
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortner <br /> you&rsquo;ll ever need! 👇
      </h2>

      <form
        onSubmit={handleSubmit}
        className="sm:h-14 flex sm:flex-row flex-col w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          placeholder="Enter your looonng URL"
          className="h-full flex-1  px-4"
            onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="h-full" type="submit">
          Shorten!
        </Button>
      </form>
      <img src="banner.jpg" className="w-full my-11 md:px-11"></img>
      <Accordion type="multiple" collapsible className="w-full md:px-11">
     
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Trimmy URL shortner works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL will redirect to the original URL when
            visited.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
           
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your shortened URLs.
            You can also view the analytics of your URLs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, the location of the clicks, and
            the devices used to access your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
