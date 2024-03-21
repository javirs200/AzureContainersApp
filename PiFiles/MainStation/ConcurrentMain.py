import multiprocessing
import threading
import time
import asyncio

def count_up():
    count = 0
    for i in range(100000000):
        count = count + i

def count_down():
    count = 0
    for i in range(100000000):
        count = count + i

async def count_up_async():
        count = 0
        for i in range(100000000):
            count = count + i

async def count_down_async():
    count = 0
    for i in range(100000000):
        count = count + i

if __name__ == "__main__":
    start_time = time.time()

    # Create two threads, each running a CPU-bound task
    process1 = multiprocessing.Process(target=count_up)
    process2 = multiprocessing.Process(target=count_down)

    # Start both threads
    process1.start()
    process2.start()

    # Wait for both threads to finish
    process1.join()
    process2.join()

    end_time = time.time()

    start_time2 = time.time()

    # Create two threads, each running a CPU-bound task
    process1 = multiprocessing.Process(target=count_up)
    process2 = multiprocessing.Process(target=count_down)

    # Start both threads
    process1.start()
    process2.start()

    # Wait for both threads to finish
    process1.join()
    process2.join()

    end_time2 = time.time()

    start_time3 = time.time()

    async def main_async():
        # Create two tasks, each running a CPU-bound task
        task1 = asyncio.create_task(count_up())
        task2 = asyncio.create_task(count_down())

        # Wait for both tasks to finish
        await asyncio.gather(task1, task2)

    asyncio.run(main_async())

    end_time3 = time.time()
    
    print(f"Time taken multiprocesing: {end_time - start_time} seconds")
    print(f"Time taken multitread: {end_time2 - start_time2} seconds")
    print(f"Time taken asyncio: {end_time3 - start_time3} seconds")