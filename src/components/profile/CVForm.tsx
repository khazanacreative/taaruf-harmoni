
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const cvFormSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  birthDate: z.date({
    required_error: "Birth date is required",
  }),
  birthPlace: z.string().min(2, { message: "Birth place is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  education: z.string().min(2, { message: "Education is required" }),
  occupation: z.string().min(2, { message: "Occupation is required" }),
  hobbies: z.string().optional(),
  about: z.string().min(20, { message: "Please write at least 20 characters about yourself" }),
  vision: z.string().min(10, { message: "Please share your vision for marriage" }),
  photo: z
    .instanceof(FileList)
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
});

type CVFormValues = z.infer<typeof cvFormSchema>;

const CVForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<CVFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      fullName: "",
      birthPlace: "",
      address: "",
      height: "",
      weight: "",
      education: "",
      occupation: "",
      hobbies: "",
      about: "",
      vision: "",
    },
  });
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    
    const file = fileList[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    
    form.setValue("photo", fileList);
  };
  
  const onSubmit = async (data: CVFormValues) => {
    setIsSubmitting(true);
    
    try {
      // This would be replaced with actual CV submission logic
      console.log("Form data:", data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "CV Submitted Successfully",
        description: "Your CV has been saved and is ready for the Taaruf process.",
      });
      
      // Redirect would happen here
    } catch (error) {
      toast({
        title: "Error Submitting CV",
        description: "There was a problem submitting your CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="glass-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-gradient mb-6">Personal CV Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Birth Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Birth Place</FormLabel>
                    <FormControl>
                      <Input placeholder="City of birth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Current Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your current address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Height in cm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight in kg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Education</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Bachelor's in Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Your current job" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hobbies"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Hobbies & Interests</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share your hobbies and interests..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>About Yourself</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about yourself, your character, personality..." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vision"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Vision for Marriage</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your expectations and vision for marriage..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label
                          htmlFor="photo-upload"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-1 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG or WEBP (MAX. 5MB)
                            </p>
                          </div>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            className="hidden"
                            onChange={handlePhotoChange}
                          />
                        </label>
                      </div>
                      
                      {photoPreview && (
                        <div className="relative h-32 w-32 rounded-lg overflow-hidden border border-border">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your photo will only be shared with approved matches.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-taaruf-blue to-taaruf-green text-white hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save CV Information"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CVForm;
