import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FnQsection() {
    return (
        <>
            <section className="py-16 px-4 md:px-24">
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                    Frequently Asked Questions
                </h2>

                {/* Description */}
                <p className="text-md md:text-xl text-center text-[#616161] font-semibold max-w-3xl mx-auto mb-8 md:mb-12">
                    You Ask, We Assume You’ll Want to Know
                </p>
                <div className=" flex justify-center w-full items-start ">
                    <Accordion className="w-full flex  flex-col gap-4" type="single" collapsible>
                        <AccordionItem className=" w-full border-[#BABABA] border-2 px-4 rounded-lg" value="item-1">
                            <AccordionTrigger className="md:text-xl text-md w-full font-semibold">What is AssumeChat?</AccordionTrigger>
                            <AccordionContent className="text-sm md:text-lg">
                                AssumeChat is a “reverse social-media” platform—think of it as an exclusive Omegle just for your campus where you meet new people first and let existing friends shape your online identity later.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-2">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">How is it different from the social apps I already use?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                Traditional networks start with people you know and reward self-promotion. AssumeChat flips both ideas: you’re paired anonymously with classmates you haven’t met, and only others can add posts or “assumptions” to your profile, so your public image is built from outside-in, not inside-out.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-3">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">Who can join?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                Early releases focus on college communities. Launch campaigns match incoming students the summer before classes begin so everyone arrives with a few ice-breaking chats under their belt.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-4">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">What exactly is an “assumption”?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                An assumption is a short, candid observation or guess about someone—e.g., “I bet Sam’s a morning person.” Users submit these about one another; AI chat prompts both people to discuss the hunch, clear up any misunderstandings and convert raw emotion into constructive conversation.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-5">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">Why can’t I post about myself?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                The core experiment is to hear how others actually see you. By outsourcing posts to friends and strangers, AssumeChat exposes blind spots and unspoken perceptions you’d never discover on a standard profile.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-6">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">How does anonymous matching work?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                New users start fully anonymous. As trust builds, they can reveal more details or move the chat to a semi-anonymous or public mode. The platform deliberately staggers these “anonymity tiers” so conversations feel safe but can deepen over time.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-7">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">What’s the rating system for?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                After each chat partners give one another a quick chillness score—basically “How nice was this person?” Low-assumption, empathetic users earn higher “Chill” ratings, making them more visible in future matches.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-8">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">How does AI fit in?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                AssumeChat’s bots nudge the dialogue: they suggest curiosity-driven questions, predict helpful follow-ups and even recommend short content clips
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-9">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">Can AssumeChat help with loneliness and mental wellbeing?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                Yes—breaking “assumption loops” is the point. The system pairs users when they’re likely to ruminate alone (late evening) and channels that energy into anonymous support rather than silent scrolling.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-10">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">Is it safe?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                               Conversations are AI-moderated for harassment and self-harm signals. You can block, report, or instantly end a chat. Because profiles are built by others, no private photos or personal contact info are ever required to participate.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-11">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">What happens to my data?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                All messages are encrypted in transit. Assumptions that become part of a public profile require your explicit opt-in, and you may remove them at any time. Aggregate, de-identified data may be used to improve matching algorithms, never sold to advertisers.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem className="border-2 w-full border-[#BABABA] px-4 rounded-lg" value="item-12">
                             <AccordionTrigger className="md:text-xl text-md w-full font-semibold">When are assumptions actually revealed to me?</AccordionTrigger>
                           <AccordionContent className="text-sm md:text-lg">
                                By default, the author of an assumption must first process their own emotion (identify → detach → universalize). Only after that reflection does the app disclose the comment—still anonymously—to its subject, sparking a balanced conversation instead of a knee-jerk.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>


        </>
    )
}