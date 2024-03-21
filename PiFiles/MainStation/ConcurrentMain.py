import multiprocessing
import time

def count_up():
    count = 0
    for i in range(100000000):
        count = count + i

def count_down():
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

    print(f"Time taken: {end_time - start_time} seconds")