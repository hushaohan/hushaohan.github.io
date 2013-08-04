all: cv.pdf

cv.pdf: *.tex
	pdflatex --shell-escape --synctex=1 cv && cp -f cv.pdf ../../site/

clean:
	rm -f *.bak
	rm -f *~
	rm -f *.pdf *.log *.aux *.bbl *.blg \#* *.dvi *.gz *.out
