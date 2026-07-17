import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database cleanup...');
  
  // Delete in order of foreign key constraints
  await prisma.orderItem.deleteMany({});
  console.log('Deleted all OrderItems');
  
  await prisma.order.deleteMany({});
  console.log('Deleted all Orders');
  
  await prisma.product.deleteMany({});
  console.log('Deleted all Products');
  
  await prisma.blog.deleteMany({});
  console.log('Deleted all Blogs');
  
  await prisma.testimonial.deleteMany({});
  console.log('Deleted all Testimonials');
  
  await prisma.contact.deleteMany({});
  console.log('Deleted all Contacts');

  console.log('Database cleanup completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
